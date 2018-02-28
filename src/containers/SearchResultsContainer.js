//@flow
import withLoader from "./withLoader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getData, getSearchPage } from "../selectors/data";
import { getItemNamesOfPage } from "../selectors/item";
import { getCauseOfFail, getFetchState } from "../selectors/fetchState";
import { mapTypeToRoute } from "../util/data";
import { mapQueryToName } from "../util/query";
import SearchResults from "../components/SearchResults";
import Loading from "../components/Loading";
import { mapDispatchToPropsView as mapDispatchToProps } from "../util/reactReduxConfig";
import { mapProps } from "recompose";
import { compose } from "redux";
import React from "react";
import type { State } from "../reducers";
import SearchResultsError from "../components/SearchResultsError";

const mapStateToProps = (state: State, ownProps) => {
  const { q, page, endpoint } = ownProps;

  const query = page && q ? { q, page } : null;
  const id = mapTypeToRoute("search", endpoint, page, query);

  return {
    data: getSearchPage(state, id, query),
    query,
    error: getCauseOfFail(state, id),
    items: getData(state)[endpoint].items
  };
};

//only update if getData changes or on route change
const connectToState = connect(mapStateToProps, mapDispatchToProps, undefined, {
  pure: true,
  areStatesEqual: (next, prev) =>
    getData(next) === getData(prev) &&
    getFetchState(next) === getFetchState(prev),
  areOwnPropsEqual: (next, prev) =>
    next.location.pathname === prev.location.pathname &&
    next.location.search === prev.location.search
});

const mapPropsForLoader = mapProps(
  ({ data, items, error, location, match, load, query, page }) => {
    const passedError = error || (query ? null : "invalid query");

    return {
      error: passedError,
      search: location.search,
      match,
      data,
      items,
      load,
      query,
      page
    };
  }
);

const loader = withLoader({
  mapProps: props => ({
    firstPage: mapQueryToName(props.match.params.endpoint, props.query),
    names: getItemNamesOfPage(props.data, props.items),
    links: props.data.items,
    next: props.data.next,
    previous: props.data.previous,
    id: props.page
  }),
  LoadingComponent: () =>
    React.createElement(Loading, {
      containerClassName: "flex-row align-items-center loading-search"
    }),
  ErrorComponent: SearchResultsError
});

export default compose(withRouter, connectToState, mapPropsForLoader, loader)(
  SearchResults
);
