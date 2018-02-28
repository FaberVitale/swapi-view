//@flow
import { equalsTo, equals } from "../util/functions";
import { combineReducers, compose } from "redux";
import { filterActions } from "redux-ignore";
import pagination from "./pagination";
import byId from "./byId";
import type { State as ById } from "./byId";
import type { State as PageState } from "./pagination";
import { endpoints } from "../routes";
import { getType, getEndpoint } from "../selectors/router";

type EndpointData = {|
  wookiee: ById,
  items: ById,
  pages: PageState
|};

type MakeEndpointReducer = string => (
  state: EndpointData,
  action: Action
) => EndpointData;

type MakeDataReducer = (
  endpoints: Array<string>
) => {
  [endpoint: string]: (state: EndpointData, action: Action) => EndpointData
};

export type State = {
  [endpoint: string]: EndpointData,
  search: PageState
};

export default (function buildDataReducer(endpoints) {
  const filterFor = {
    page: compose(equals("page"), getType),
    item: compose(equalsTo("page", "item", "search"), getType),
    wookiee: compose(equals("wookiee"), getType),
    search: compose(equals("search"), getType)
  };

  const makeEndpointReducer: MakeEndpointReducer = (endpoint: string) =>
    filterActions(
      combineReducers({
        pages: filterActions(pagination, filterFor.page),
        items: filterActions(byId, filterFor.item),
        wookiee: filterActions(byId, filterFor.wookiee)
      }),
      compose(equals(endpoint), getEndpoint)
    );

  const makeDataReducer: MakeDataReducer = endpoints => {
    const res = endpoints.reduce((aggr, next) => {
      aggr[next] = makeEndpointReducer(next);

      return aggr;
    }, {});

    res.search = filterActions(pagination, filterFor.search);

    return res;
  };

  return combineReducers(makeDataReducer(endpoints));
})(endpoints || []);
