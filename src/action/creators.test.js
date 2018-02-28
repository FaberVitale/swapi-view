import * as creators from "./creators";
import {
  drawerAction,
  fetchFailAction,
  fetchSuccessAction,
  fetchResourceAction
} from "../__mocks__/action";

describe("action/creators", () => {
  test("drawerRequestChange", () => {
    expect(creators.drawerRequestChange(true)).toEqual(drawerAction);
    expect(creators.drawerRequestChange(false)).toEqual(
      Object.assign({}, drawerAction, { value: false })
    );
  });

  test("fetchFail", () => {
    expect(
      creators.fetchFail(fetchFailAction.request, fetchFailAction.cause)
    ).toEqual(fetchFailAction);
  });

  test("fetchSuccess", () => {
    expect(creators.fetchSuccess(fetchSuccessAction.item.request, {})).toEqual(
      fetchSuccessAction.item
    );

    expect(
      creators.fetchSuccess(fetchSuccessAction.page.request, {
        previous: fetchSuccessAction.page.data.previous,
        next: fetchSuccessAction.page.data.next,
        results: fetchSuccessAction.page.data.results.map(item => ({
          url: item.meta.url
        }))
      })
    ).toEqual(fetchSuccessAction.page);

    expect(
      creators.fetchSuccess(fetchSuccessAction.wookiee.request, {})
    ).toEqual(fetchSuccessAction.wookiee);
  });

  test("fetchRouteResource", () => {
    expect(
      creators.fetchRouteResource(
        fetchResourceAction.page.request.match,
        {},
        false
      )
    ).toEqual(fetchResourceAction.page);

    expect(
      creators.fetchRouteResource(
        fetchResourceAction.item.request.match,
        {},
        false
      )
    ).toEqual(fetchResourceAction.item);

    expect(
      creators.fetchRouteResource(
        fetchResourceAction.wookiee.request.match,
        {},
        false
      )
    ).toEqual(fetchResourceAction.wookiee);

    const query = fetchResourceAction.search.request.query;

    expect(
      creators.fetchRouteResource(
        fetchResourceAction.search.request.match,
        `?q=${query.q}&$page=${query.page}`,
        false
      )
    ).toEqual(fetchResourceAction.search);
  });
});
