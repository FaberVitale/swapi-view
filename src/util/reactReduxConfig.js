//@flow
import { fetchRouteResource } from "../action/creators";
import { getData } from "../selectors/data";
import { getFetchState } from "../selectors/fetchState";
import type { Match, Location } from "react-redux";
import type { State } from "../reducers";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import { isDrawerOpen } from "../selectors/drawer";
import { drawerRequestChange } from "../action/creators";

type DispatchProps = {
  load: () => void
};

type StateProps = {};

type RouterProps = {
  match: Match,
  location: Location,
  history: History
};

/* these are the props passed to Page and Item */
const mergePropsView: (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: RouterProps
) => * = (stateProps, dispatchProps, ownProps) => {
  let res = {};

  res.match = ownProps.match;
  res.search = ownProps.location.search;
  return Object.assign(res, stateProps, dispatchProps);
};

/* the function load is used to request data from api on location.pathname changes*/
export const mapDispatchToPropsView = (
  dispatch: Dispatch<Action>,
  ownProps: RouterProps
) => ({
  load: () => {
    dispatch(
      fetchRouteResource(ownProps.match, ownProps.location.search, false)
    );
  }
});
// re-render for changes in state.data or if the url changes
const connectOptionsView = {
  pure: true,
  areStatesEqual: (next: State, prev: State) =>
    getData(next) === getData(prev) &&
    getFetchState(next) === getFetchState(prev),
  areOwnPropsEqual: (next: RouterProps, prev: RouterProps) =>
    next.location.pathname === prev.location.pathname &&
    next.location.search === prev.location.search
};

export const connectView = (
  mapStateToProps: ?(state: State, ownProps: RouterProps) => Object = null
) => {
  return connect(
    mapStateToProps,
    mapDispatchToPropsView,
    mergePropsView,
    connectOptionsView
  );
};

export const mapStateToPropsDrawer = (state: State) => ({
  isOpen: isDrawerOpen(state)
});

// we need to throttle because material buttons trigger twice  event listeners
// applied to a "click" event, if Enter is input
// see: https://github.com/mui-org/material-ui/issues/9344
export const mapDispatchToPropsDrawer = (dispatch: Dispatch<Action>) => ({
  toggleDrawer: (value: boolean) => dispatch(drawerRequestChange(value))
});

export const connectDrawer = (addDispatchTopProps?: boolean = false) => {
  return connect(
    mapStateToPropsDrawer,
    addDispatchTopProps ? mapDispatchToPropsDrawer : null,
    undefined,
    {
      pure: true,
      areStatesEqual: (next, prev) => isDrawerOpen(next) === isDrawerOpen(prev)
    }
  );
};
