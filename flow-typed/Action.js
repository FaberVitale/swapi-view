/* eslint-disable no-undef*/
import type { Match } from "react-router-dom";

/* name: the resource used as identifier in redux store
 * url: the url of the resource if null the request will be discarded
 * init: second optinal argument of a fetch request.
 * match: if it is a route-based resource it will contain the matched prop passed by the router
 * query: an object that maps keys to the decoded values of the query part of the url 
 * type: the api type of the resource or the mime type
 * shouldInvalidate: if resource is already in memory it will download again only if true
 */
declare type FetchRequest = {|
  +name: string,
  +url: string | null,
  +init?: RequestOptions,
  +match: Match,
  +query: Object | null,
  +type: string,
  +shouldInvalidate: boolean
|};

/* ---- ACTIONS ---- */

declare type FetchResourceAction = {|
  +type: "FETCH_RESOURCE",
  +request: FetchRequest
|};

declare type FetchFailAction = {|
  +type: "FETCH_FAIL",
  +request: FetchRequest,
  +cause: string
|};

declare type FetchSuccessAction = {|
  +type: "FETCH_SUCCESS",
  +request: FetchRequest,
  +data: any
|};

declare type ChangeStateDrawerAction = {|
  +type: "REQUEST_CHANGE_DRAWER",
  +value: boolean
|};

declare type LoadImageAction = {|
  +type: "LOAD_IMAGE"
|};

declare type SaveImageAction = {|
  +type: "SAVE_IMAGE_URL",
  +url: string
|};

declare type FailedToLoadImageAction = {|
  +type: "FAILED_TO_LOAD_IMAGE"
|};

declare type Action =
  | FetchFailAction
  | FetchSuccessAction
  | FetchResourceAction
  | ChangeStateDrawerAction
  | SaveImageAction
  | FailedToLoadImageAction
  | LoadImageAction;

/* ---- ACTION CREATORS ---- */
declare type FetchRouteResource = (
  match: Match,
  search: string,
  shouldInvalidate: boolean
) => FetchResourceAction;

declare type FetchFail = (
  request: FetchRequest,
  cause: string
) => FetchFailAction;

declare type FetchSuccess = (
  request: FetchRequest,
  data: any
) => FetchSuccessAction;

declare type ChangeStateDrawer = (value: boolean) => ChangeStateDrawerAction;

declare type SaveImage = (blobUrl: string) => SaveImageAction;

declare type LoadImage = () => LoadImageAction;

declare type FailedToLoadImage = () => FailedToLoadImageAction;
