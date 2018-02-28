//@flow
import SearchWidget from "../components/SearchWidget";
import { connect } from "react-redux";
import { getDataSources, getData } from "../selectors/data";
import { withRouter } from "react-router-dom";
/* Injects in the component the required props and blocks the other
 * Passed Props:
 *   dataSources is an object that maps endpoint to a list of autocompletion values
 *   push is react-router history.push 
 * connectOptions is used to exclude the frequently changing drawer state. 
 */

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  dataSources: stateProps,
  push: ownProps.history.push,
  text: ownProps.text,
  selected: ownProps.selected,
  page: ownProps.page
});

const connectOptions = {
  pure: true,
  areStatesEqual: (next, prev) => getData(next) === getData(prev)
};

export default withRouter(
  connect(getDataSources, null, mergeProps, connectOptions)(SearchWidget)
);
