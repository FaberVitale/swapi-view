//@flow
import { FETCH_FAIL, FETCH_SUCCESS, FETCH_RESOURCE } from "../action/types";
import { notEqual } from "../util/functions";

export type State = {|
  +pending: Array<string>,
  +failed: { [route: string]: string }
|};

const initState: State = {
  pending: [],
  failed: {}
};

type FetchReducer = (state: State, action: Action) => State;

/* Holds info on currently pending and failed requests */
const fetchReducer: FetchReducer = (state = initState, action) => {
  if (!action.request) {
    return state;
  }
  const { type, request } = action;
  const name: string = request.name;

  switch (type) {
    case FETCH_FAIL:
      let cause = action.cause || "error";

      return {
        pending: state.pending.filter(notEqual(name)),
        failed: Object.assign({}, state.failed, {
          [name]: cause
        })
      };
    case FETCH_SUCCESS:
      return {
        pending: state.pending.filter(notEqual(name)),
        failed: state.failed
      };
    case FETCH_RESOURCE:
      let failed;
      if (Object.prototype.hasOwnProperty.call(state.failed, name)) {
        failed = { ...state.failed };

        delete failed[name];
      } else {
        failed = state.failed;
      }

      return {
        pending: [...state.pending, name],
        failed
      };
    default:
      return state;
  }
};

export default fetchReducer;
