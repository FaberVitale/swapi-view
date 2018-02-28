//@flow
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import fetchMiddleware from "./middleware/fetchMiddleware";
import { fetchData } from "./util/api";

const configureStore = (function buildConfigureStore() {
  const middeware = applyMiddleware(fetchMiddleware(fetchData()));

  const reduxDevTool: Function | void =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  return process.env.NODE_ENV === "production"
    ? () => createStore(reducer, middeware)
    : () => createStore(reducer, reduxDevTool, middeware);
})();

export default configureStore;
