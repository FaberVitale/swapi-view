import fetchMiddleware from "./fetchMiddleware";
import { FETCH_RESOURCE, FETCH_SUCCESS, FETCH_FAIL } from "../action/types";
import reducer from "../reducers";

describe("fetchMiddleware", () => {
  const action = {
    type: FETCH_RESOURCE,
    request: { name: "name", url: "url", shouldInvalidate: true }
  };
  const badUrl = { type: FETCH_RESOURCE, request: { name: "", url: null } };
  const testAction = { type: "@@TEST" };

  const response = { status: 200, statusText: "200", json: (...any) => {} };

  const fetchData = jest.fn();

  const initState = reducer(undefined, {});

  const mockDispatch = jest.fn();
  const mockGetState = jest.fn();
  const mockNext = jest.fn();

  const middlewareApi = {
    dispatch: mockDispatch,
    getState: mockGetState
  };

  const middleware = fetchMiddleware(fetchData)(middlewareApi)(mockNext);

  beforeEach(() => {
    fetchData.mockImplementation(() => Promise.resolve(response));
    mockGetState.mockImplementation(() => initState);
  });

  afterEach(() => {
    fetchData.mockClear();
    mockDispatch.mockClear();
    mockGetState.mockClear();
    mockNext.mockClear();
  });

  it("returns next(action) on action.type that isnt FETCH_RESOURCE", () => {
    middleware(testAction);

    expect(fetchData.mock.calls).toHaveLength(0);
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls).toHaveLength(0);
    expect(mockNext.mock.calls[0][0]).toBe(testAction);
  });

  it("returns next(action) then async dispatches a fetchFail if request.url is not string", () => {
    expect.assertions(7);

    const promise = new Promise((resolve, reject) => {
      mockDispatch.mockImplementation(resolve);
    });

    middleware(badUrl);

    expect(fetchData.mock.calls).toHaveLength(0);
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(mockNext.mock.calls[0][0]).toBe(badUrl);
    expect(mockDispatch.mock.calls).toHaveLength(0); //<-- it is not called sync

    return promise.then(r => {
      expect(mockDispatch.mock.calls[0][0]).toHaveProperty("type", FETCH_FAIL);
      expect(mockNext.mock.calls).toHaveLength(1);
      expect(fetchData.mock.calls).toHaveLength(0);
    });
  });

  it("returns next(action) then async dispatches a FETCH_SUCCESS if url is string", done => {
    middleware(action);

    expect(fetchData.mock.calls).toHaveLength(1);
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(mockNext.mock.calls[0][0]).toBe(action);

    setTimeout(() => {
      expect(mockDispatch.mock.calls[0][0]).toHaveProperty(
        "type",
        FETCH_SUCCESS
      );
      done();
    }, 0);
  });

  it("doesnt return next(action), nor dispatches actions if resource is pending", done => {
    // we return a state where the resource with name "name" is Pending
    mockGetState.mockImplementation(() => {
      return reducer(initState, action);
    });

    middleware(action);

    expect(mockDispatch.mock.calls).toHaveLength(0);
    expect(mockNext.mock.calls).toHaveLength(0);
    expect(fetchData.mock.calls).toHaveLength(0);

    setTimeout(() => {
      expect(mockDispatch.mock.calls).toHaveLength(0);
      expect(mockNext.mock.calls).toHaveLength(0);
      expect(fetchData.mock.calls).toHaveLength(0);
      done();
    }, 0);
  });

  it("if a RequestInfo obj is in request, it is passed as 2nd argument to fetchData", () => {
    const reqInfo = { method: "GET", mode: "same-origin" };
    const actionWithRequestInfo = Object.assign({}, action, {
      request: { ...action.request, init: reqInfo }
    });

    middleware(actionWithRequestInfo);

    expect(fetchData.mock.calls).toHaveLength(1);
    expect(fetchData.mock.calls[0]).toEqual([
      actionWithRequestInfo.request.url,
      actionWithRequestInfo.request.init
    ]);
  });
});
