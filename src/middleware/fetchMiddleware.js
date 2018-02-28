//@flow
import type { Middleware } from "redux";
import { FETCH_RESOURCE } from "../action/types";
import { fetchSuccess, fetchFail } from "../action/creators";
import { warn } from "../util/functions";
import { hasResource } from "../selectors/data";
import { isPending } from "../selectors/fetchState";
import { ApiError } from "../util/api";

/* Function that returns  a Middleware responsible for async behaviour.
 * given a fetch-like function (url: string) => Promise<any>
 * 
 * On api_requests (FETCH_RESOURCE) the middleware
 * calls the function passed as argument:
 * 1 - onFulfill dispatches a FetchSuccessAction
 * 2 - onReject dispatches a FetchFailAction
 */
type FetchMiddleware = (
  fetchData: (url: string, init?: RequestOptions) => Promise<any>
) => Middleware;

const fetchMiddleware: FetchMiddleware = fetchData => ({
  dispatch,
  getState
}) => next => {
  if (typeof fetchData !== "function") {
    warn("first argument of fetchMiddleware is not a function");
  }

  const onFulFill = (request: FetchRequest) => data =>
    dispatch(fetchSuccess(request, data));

  const onRejection = (request: FetchRequest) => error => {
    let cause;
    if (error instanceof ApiError) {
      cause = String(error.status);
    } else {
      cause = error.message;
    }
    warn(request, error);

    dispatch(fetchFail(request, cause));
  };

  return (action: Action) => {
    if (action.type === FETCH_RESOURCE) {
      (action: FetchResourceAction); //eslint-disable-line no-unused-expressions

      const request = action.request;
      const url = request.url;
      if (typeof url !== "string") {
        /* 
          we let thru this invalid request
          to let the reducers store it as pending then
          we will dispatch a rejection 
        */
        Promise.reject(
          new Error(
            `FetchMiddleware: Invalid resource requested: ${request.name}`
          )
        ).catch(onRejection(request));
      } else {
        const state = getState();
        const isStored = hasResource(state, request);

        /* We prevent the dispatch of the action:
         *  1 -  if we have already requested that resource and it is pending 
         *  2 -  if the data is already in the state and shouldInvalidate is false
         */
        if (
          isPending(state, request.name) ||
          (isStored && !request.shouldInvalidate)
        ) {
          return;
        }

        const fetchRequest = request.init
          ? fetchData(url, request.init)
          : fetchData(url);

        fetchRequest
          .then(res => res.json())
          .then(onFulFill(request), onRejection(request));
      }
    }
    // we let through FETCH_RESOURCE actions
    // in order to let the reducer store pending requests.
    return next(action);
  };
};

export default fetchMiddleware;
