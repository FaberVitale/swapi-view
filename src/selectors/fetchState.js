//@flow
import type { State } from "../reducers";
import { equals } from "../util/functions";

export const getFetchState = (state: State) => state.fetchState;

const getPendingRequests = (state: State) => getFetchState(state).pending;

export const isPending = (state: State, route: string) =>
  getPendingRequests(state).some(equals(route));

export const getCauseOfFail = (state: State, route: string) =>
  getFetchState(state).failed[route];
