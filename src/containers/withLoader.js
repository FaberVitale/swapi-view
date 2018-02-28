//flow
import * as React from "react";
import { getDisplayName, identity } from "../util/functions";
import type { Match } from "react-router-dom";
/* Higher order component that given the props passed renders 3 different components:
 *  
 * Props: 
 *  data:  ?D if null or undefined data is not loaded
 *  error: ?E if null or undefined error has not occurred
 *  load:  () => void function that is called when data is not null or undefined
 *  search: react-router's location.search string
 *  match: React-router's Match, used to call load on route changes.
 *  
 * Components:
 * 1 - If props.error is NOT null or undefined renders 
 *    <ErrorComponent error={error}{...otherProp} />.
 * 2 - If props.data is NOT null or undefined renders 
 *    <WrappedComponent data={data} {...otherProp} />.
 * 3 - Otherwise renders <LoadingComponent {...otherProp} />.
 * 
 * It will call load again onDidUpdate if it is in Loading state and route has changed
 * 
 *  Options:
 *    mapProps: equivalent to Recompose mapProps it is applied only to the wrappedComponent
 *      description: a transformation of the props passed to the WrappedComponent, props.data included.
 *      default: obj => obj
 *    LoadingComponent: React.ElementType (a React Component or a string).
 *      description: Component rendered if props.error and props.data are both null or undefined
 *      default:   () => <p>Loading...</p>
 *    ErrorComponent: React.ElementType (a React Component or a string).
 *      description: Component rendered if props.error is not null or undefined
 *      it passed the load function renamed retry, error, and other props
 *       default: () => <p>An error has occurred.</p>.
*/

type Options = {|
  mapProps: (props: {}) => {},
  LoadingComponent: React.ComponentType<any>,
  ErrorComponent: React.ComponentType<any>
|};

type Props<D, E> = {
  match: Match,
  search: string,
  data?: ?D,
  error?: ?E,
  load: () => void
};

type HocType = <D, E>(
  opt?: Options
) => (React.ComponentType<any>) => React.Component<Props<D, E>>;

const defaultOpt: Options = {
  mapProps: identity,
  LoadingComponent: () => <p>Loading...</p>,
  ErrorComponent: () => <p>An error has occurred.</p>
};

const withLoader: HocType = (options: Options = defaultOpt) => (
  WrappedComponent: React.ComponentType<any>
) => {
  let opt: Options =
    options === defaultOpt ? options : Object.assign({}, defaultOpt, options);

  class Loader extends React.Component<Props<D, E>> {
    componentDidMount() {
      //true if undefined or null
      if (this.props.data == null && this.props.error == null) {
        this.props.load();
      }
      this._route = this.props.match.url;
      this._search = this.props.search;
    }

    componentDidUpdate() {
      if (
        (this.props.match.url !== this._route ||
          this._search !== this.props.search) &&
        this.props.data == null &&
        this.props.error == null
      ) {
        this.props.load();

        this._search = this.props.search;
        this._route = this.props.match.url;
      }
    }
    render() {
      const { data, error, load, ...rest } = this.props;

      let nextProps, Comp;

      if (error != null) {
        nextProps = Object.assign(rest, { error, retry: load });
        Comp = opt.ErrorComponent;
      } else if (data != null) {
        nextProps = opt.mapProps({ data, ...rest });
        Comp = WrappedComponent;
      } else {
        nextProps = rest;
        Comp = opt.LoadingComponent;
      }

      return React.createElement(Comp, nextProps);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    Loader.displayName = getDisplayName("Loader", WrappedComponent);
  }
  return Loader;
};

export default withLoader;
