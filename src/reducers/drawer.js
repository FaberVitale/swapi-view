//@flow
import { REQUEST_CHANGE_DRAWER } from "../action/types";
export type State = boolean;

export default (state: State = false, action: Action) => {
  if (action.type === REQUEST_CHANGE_DRAWER) {
    return !!action.value;
  }
  return state;
};
