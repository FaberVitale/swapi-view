//@flow
import {
  FETCH_RESOURCE,
  FETCH_SUCCESS,
  FETCH_FAIL,
  REQUEST_CHANGE_DRAWER,
  SAVE_IMAGE_URL,
  FAILED_TO_LOAD_IMAGE,
  LOAD_IMAGE
} from "./types";
import { apiRoot, qsOpt } from "../routes";
import qs from "qs";
import { getQuery } from "../util/query";
import { transformPage, transformItem, mapTypeToRoute } from "../util/data";
import { api } from "../requestOptions";

export const fetchRouteResource: FetchRouteResource = (
  match,
  search,
  shouldInvalidate
) => {
  let name: string = match.url;
  let url: string | null = null;
  const { endpoint, id, type } = match.params;
  let query = null;
  if (type === "search") {
    query = getQuery(search);

    if (query) {
      const searchString = qs.stringify(
        { search: query.q, page: query.page },
        qsOpt
      );
      url = `${apiRoot}${endpoint}?${searchString}`;
      name = mapTypeToRoute(type, endpoint, url, query);
    } else {
      name = `/${endpoint}/search/invalid_query`;
    }
  } else if (endpoint && id) {
    /* eslint-disable default-case */
    switch (type) {
      case "page":
        url = `${apiRoot}${endpoint}?page=${id}`;
        break;
      case "item":
        url = `${apiRoot}${endpoint}/${id}`;
        break;
      case "wookiee":
        url = `${apiRoot}${endpoint}/${id}?format=wookiee`;
        break;
    }
    /* eslint-enable default-case */
  }

  return {
    type: FETCH_RESOURCE,
    request: {
      name,
      url,
      init: api,
      query,
      match,
      type,
      shouldInvalidate
    }
  };
};

export const fetchSuccess: FetchSuccess = (request, data) => {
  let nextData;

  switch (request.type) {
    case "page":
      nextData = transformPage(request, data);
      break;
    case "search":
      nextData = transformPage(request, data);
      break;
    case "item":
      nextData = transformItem(data);
      break;
    case "wookiee":
      nextData = transformItem(data);
      break;
    default:
      nextData = data;
  }

  return {
    type: FETCH_SUCCESS,
    request,
    data: nextData
  };
};

export const fetchFail: FetchFail = (request, cause) => ({
  type: FETCH_FAIL,
  request,
  cause
});

export const drawerRequestChange: ChangeStateDrawer = (value: boolean) => ({
  type: REQUEST_CHANGE_DRAWER,
  value
});

export const saveImageURL: SaveImage = (blobUrl: string) => ({
  type: SAVE_IMAGE_URL,
  url: blobUrl
});

export const failToLoadImage: FailedToLoadImage = () => ({
  type: FAILED_TO_LOAD_IMAGE
});

export const loadImage: LoadImage = () => ({
  type: LOAD_IMAGE
});
