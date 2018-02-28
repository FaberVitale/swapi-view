import * as fn from "./data";
import reducer from "../reducers";
import { fetchSuccessAction as action } from "../__mocks__/action";
import { endpoints } from "../routes";

describe("selectors/data", () => {
  const initState = reducer(undefined, {});
  const itemMatch = action.item.request.match;
  const wookieeMatch = action.wookiee.request.match;
  const pageMatch = action.page.request.match;
  test("getData", () => {
    expect(fn.getData(initState)).toBe(initState.data);
  });

  test("getPage", () => {
    expect(
      fn.getPage(reducer(initState, action.page), pageMatch)
    ).toMatchSnapshot();

    expect(fn.getPage(initState, pageMatch)).toBe(undefined);
  });

  test("getItemOrWookiee", () => {
    expect(
      fn.getItemOrWookiee(reducer(initState, action.item), itemMatch)
    ).toMatchSnapshot();
    expect(
      fn.getItemOrWookiee(reducer(initState, action.wookiee), wookieeMatch)
    ).toMatchSnapshot();

    expect(fn.getItemOrWookiee(initState, wookieeMatch)).toBe(undefined);
    expect(fn.getItemOrWookiee(initState, itemMatch)).toBe(undefined);
  });

  test("hasResource", () => {
    expect(fn.hasResource(initState, action.page.request)).toBe(false);
    expect(
      fn.hasResource(reducer(initState, action.page), action.page.request)
    ).toBe(true);
    expect(
      fn.hasResource(reducer(initState, action.item), action.item.request)
    ).toBe(true);
    expect(
      fn.hasResource(reducer(initState, action.wookiee), action.wookiee.request)
    ).toBe(true);

    expect(
      fn.hasResource(reducer(initState, action.search), action.search.request)
    ).toBe(true);
  });

  describe("getDataSources", () => {
    it("returns an object that maps endpoints to [] if the initState is passed", () => {
      const res = fn.getDataSources(initState);
      const base = {
        suggestions: [],
        suggestionToKey: {}
      };
      const expected = endpoints.reduce((obj, endpoint) => {
        obj[endpoint] = base;
        return obj;
      }, {});

      expect(res).toEqual(expected);
    });
  });

  it("returns the same object if the state.data doesnt change", () => {
    const before = fn.getDataSources(initState);
    expect(before).toBe(fn.getDataSources(initState));

    const nextState = reducer(initState, action.item);
    const after = fn.getDataSources(nextState);

    expect(before).not.toBe(after);

    expect(after).toBe(fn.getDataSources(nextState));
  });
});
