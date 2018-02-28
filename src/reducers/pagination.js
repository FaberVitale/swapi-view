//@flow
import { FETCH_SUCCESS } from "../action/types";

export type State = {
  [route: string]: {|
    +items: Array<string>,
    +next: string | null,
    +previous: string | null
  |}
};

type Pagination = (state: State, action: Action) => State;

/* Reducer that stores pagination info
 * on its own will store every info that is passed if action is FETCH_SUCCESS
 * and matches the duck-typing checks.
 * it is meant to be used with a higher order reducer like filterActions(redux-ignore),
 * in order to be reused mutiple times in the same reducer
 */
const pagination: Pagination = (state: State = {}, action: Action) => {
  if (action.type !== FETCH_SUCCESS || !action.request) {
    return state;
  }

  const { data, request } = action;

  if (
    data.next === undefined ||
    data.previous === undefined ||
    !Array.isArray(data.ids)
  ) {
    return state;
  }

  const page = {
    next: data.next,
    previous: data.previous,
    items: data.ids
  };

  return {
    ...state,
    [request.name]: page
  };
};

export default pagination;
