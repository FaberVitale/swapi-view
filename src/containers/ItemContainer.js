//@flow
import withLoader from "./withLoader";
import Item from "../components/Item";
import { getItemOrWookiee } from "../selectors/data";
import { getCauseOfFail } from "../selectors/fetchState";
import type { Match } from "react-router-dom";
import type { State } from "../reducers";
import { connectView as connect } from "../util/reactReduxConfig";
import Loading from "../components/Loading";
import FailedToLoad from "../components/FailedToLoad";
import { withPropsOnChange } from "recompose";
import { getEditedKey, getItemName } from "../selectors/item";

const connectState = connect((state: State, ownProps: { match: Match }) => ({
  data: getItemOrWookiee(state, ownProps.match),
  error: getCauseOfFail(state, ownProps.match.url)
}));

const loader = withLoader({
  mapProps: (props: { data: ItemData, match: Match }) => ({
    item: props.data,
    route: props.match.url
  }),
  LoadingComponent: Loading,
  ErrorComponent: FailedToLoad
});

const addPropsOnChange = withPropsOnChange(
  (props, nextProps) => props.route !== nextProps.route,
  props => ({
    name: getItemName(props.item),
    editedKey: getEditedKey(props.item)
  })
);

export default connectState(loader(addPropsOnChange(Item)));
