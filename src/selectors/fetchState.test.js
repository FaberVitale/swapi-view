import * as selector from "./fetchState";
import reducer from "../reducers";
import { fetchFailAction, fetchResourceAction } from "../__mocks__/action";

describe("selectors/fetchState", () => {
  let initState, pending, failed;

  beforeAll(() => {
    initState = reducer(undefined, {});

    pending = reducer(initState, fetchResourceAction.page);

    failed = reducer(initState, fetchFailAction);
  });

  test("getFetchState", () => {
    expect(selector.getFetchState(initState)).toBe(initState.fetchState);
  });

  test("isPending", () => {
    const name = fetchResourceAction.page.request.name;
    expect(selector.isPending(initState, name)).toBe(false);
    expect(selector.isPending(pending, name)).toBe(true);
  });

  test("getCauseOfFail", () => {
    const cause = fetchFailAction.cause;
    const name = fetchFailAction.request.name;

    expect(selector.getCauseOfFail(initState, name)).toBe(undefined);
    expect(selector.getCauseOfFail(failed, name)).toBe(cause);
  });
});
