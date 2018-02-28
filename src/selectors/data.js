//@flow
import type { State } from "../reducers";
import type { Match } from "react-router-dom";
import { createSelector } from "reselect";
import { endpoints, searchFieldsOf } from "../routes";

export const getData = (state: State) => state.data;

const getEndpointData = (state: State, match: Match) => {
  const data = getData(state);
  const endpoint = match.params.endpoint || null;

  return data && endpoint ? data[endpoint] : null;
};

export const hasResource = (state: State, request: FetchRequest) => {
  const { match, type, query, name } = request;

  switch (type) {
    case "search":
      return !!getSearchPage(state, name, query);
    case "item":
      return !!getItem(state, match);
    case "page":
      return !!getPage(state, match);
    case "wookiee":
      return !!getWookiee(state, match);
    default:
      return false;
  }
};

const getItem = (state: State, match: Match) => {
  const endpointData = getEndpointData(state, match);

  return endpointData && endpointData.items[match.url];
};

export const getPage = (state: State, match: Match) => {
  const endpointData = getEndpointData(state, match);

  return endpointData && endpointData.pages[match.url];
};

const getWookiee = (state: State, match: Match) => {
  const endpointData = getEndpointData(state, match);

  return endpointData && endpointData.wookiee[match.url];
};

const defaultSearchPage = {
  previous: null,
  next: null,
  items: []
};

export const getSearchPage = (
  state: State,
  name: string,
  query: { q: string, page: string } | null
) => {
  if (!query) {
    return defaultSearchPage;
  }

  return getData(state).search[name] || null;
};

export const getItemOrWookiee = (state: State, match: Match) => {
  return match.params.type === "item"
    ? getItem(state, match)
    : getWookiee(state, match);
};

/* getItemsOf[endpoint]:  (data) => data[endpoint].items
 * in order to work, it requires that the input is the result of getData
 * */
export const getItemsOf = endpoints.reduce((res, endpoint) => {
  res[endpoint] = data => data[endpoint].items;

  return res;
}, {});

/* Object that maps endpoints to  a function that creates an array of suggestions
 * given the endpoint given the result of getData  */
export const getSearchSuggestionsOf = (function buildSearchSuggestionsOf(
  endpoints
) {
  const retrieveSuggestions = (endpoint: string) => items => {
    let suggestions: Array<string> = [];
    const keys: Array<string> = Object.keys(items);

    const suggestionToKey = {};

    for (const key of keys) {
      const searchValues = searchFieldsOf[endpoint].map(
        searchValue => items[key].data[searchValue]
      );
      suggestions.push(...searchValues);

      for (const searchValue of searchValues) {
        suggestionToKey[searchValue] = key;
      }
    }

    // a lot vehicles and starships have duplicated values
    if (suggestions.length > 1 && searchFieldsOf[endpoint].length > 1) {
      suggestions = [...new Set(suggestions)];
    }

    return {
      suggestions,
      suggestionToKey
    };
  };

  let res: {
    [endpoint: string]: (items: {}) => {
      suggestion: Array<string>,
      suggestionToKey: { [sugg: string]: string }
    }
  } = {};

  for (const endpoint of endpoints) {
    res[endpoint] = createSelector(
      getItemsOf[endpoint],
      retrieveSuggestions(endpoint)
    );
  }

  return res;
})(endpoints || []);

/* given (state: State) passed returns an object that maps endoints to suggestions list */
export const getDataSources = createSelector(getData, function buildDatasources(
  data
) {
  const res = {};

  for (let i = 0, len = endpoints.length; i < len; i++) {
    res[endpoints[i]] = getSearchSuggestionsOf[endpoints[i]](data);
  }

  return res;
});
