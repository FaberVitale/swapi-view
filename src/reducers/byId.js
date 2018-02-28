//@flow
import { FETCH_SUCCESS } from "../action/types";

/* reducer that stores data in an object given an identifier
 * on its own will store any action.data in a FETCH_SUCCESS action.
 * It has to be wrapped in a filterAction (redux-ignore)
 * in order to discriminate by resource type
 */
export type State = {
  [resource: string]: {}
};

type ById = (state: State, action: Action) => State;

const byId: ById = (state: State = {}, action: Action) => {
  if (action.type !== FETCH_SUCCESS) {
    return state;
  }

  const { request, data } = action;

  if (data && Array.isArray(data.results) && Array.isArray(data.ids)) {
    const nextState = { ...state };

    for (let i = 0, len = data.ids.length; i < len; i++) {
      nextState[data.ids[i]] = data.results[i];
    }

    return nextState;
  } else {
    const id = request.name;

    return {
      ...state,
      [id]: data
    };
  }
};

export default byId;
