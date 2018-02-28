//@flow
import withLoader from "./withLoader";
import Page from "../components/Page";
import { getData, getPage } from "../selectors/data";
import { getItemNamesOfPage } from "../selectors/item";
import { getCauseOfFail } from "../selectors/fetchState";
import Loading from "../components/Loading";
import { connectView as connect } from "../util/reactReduxConfig";
import FailedToLoad from "../components/FailedToLoad";
import { withPropsOnChange } from "recompose";

const connectState = connect((state, ownProps) => ({
  data: getPage(state, ownProps.match),
  error: getCauseOfFail(state, ownProps.match.url),
  items: getData(state)[ownProps.match.params.endpoint].items
}));

const addPropsOnChange = withPropsOnChange(["data", "items"], props => ({
  itemNames:
    props.data && props.items
      ? getItemNamesOfPage(props.data, props.items)
      : null
}));

const loader = withLoader({
  mapProps: props => ({
    route: props.match.url,
    endpoint: props.match.params.endpoint,
    id: props.match.params.id,
    next: props.data.next,
    previous: props.data.previous,
    names: props.itemNames,
    links: props.data.items
  }),
  LoadingComponent: Loading,
  ErrorComponent: FailedToLoad
});

export default connectState(addPropsOnChange(loader(Page)));
