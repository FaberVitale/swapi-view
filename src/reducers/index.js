//@flow
import { combineReducers } from "redux";
import fetchReducer from "./fetchReducer";
import drawer from "./drawer";
import image from "./image";
import type { State as FetchState } from "./fetchReducer";
import type { State as Drawer } from "./drawer";
import type { State as ImageState } from "./image";
import data from "./data";
import type { State as Data } from "./data";

export type State = {|
  +background: ImageState,
  +drawer: Drawer,
  +fetchState: FetchState,
  +data: Data
|};

export default combineReducers({
  background: image,
  drawer,
  fetchState: fetchReducer,
  data
});
