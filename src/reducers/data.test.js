import { default as reducer } from "./data";
import { endpoints } from "../routes";
import {
  fetchFailAction,
  fetchSuccessAction,
  fetchResourceAction
} from "../__mocks__/action";

describe("reducers/data", () => {
  let initState;

  beforeAll(() => {
    initState = reducer(undefined, {});
  });

  it("initial state is an object that has keys: endpoints + search", () => {
    const keys = endpoints.concat("search");

    expect(Object.keys(initState)).toEqual(keys);
  });

  it("returns the same object on an action that isnt fetchSuccess", () => {
    expect(reducer(initState, fetchFailAction)).toBe(initState);

    expect(reducer(initState, fetchResourceAction)).toBe(initState);
  });

  it("returns a new object on fetchSuccess if request.type and request.match.params.endpoint match", () => {
    expect(reducer(initState, fetchSuccessAction.page)).not.toBe(initState);
  });
});
