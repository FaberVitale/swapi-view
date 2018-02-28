import { default as reducer } from "./fetchReducer";
import {
  fetchResourceAction,
  fetchFailAction,
  fetchSuccessAction
} from "../__mocks__/action";

describe("reducers/fetchReducer", () => {
  it("returns the initial state if undefined is passed", () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it("returns the previous state if an unused action type is used", () => {
    expect(
      reducer(reducer(undefined, {}), { type: "@@/TEST" })
    ).toMatchSnapshot();
  });

  it("adds request.name to pending if a fetchResource action is passed", () => {
    expect(
      reducer(reducer(undefined, {}), fetchResourceAction.page)
    ).toMatchSnapshot();
  });

  it("removes request.name from pending, if present, on a fetchSuccess action", () => {
    expect(
      reducer(
        reducer(reducer(undefined, {}), fetchResourceAction.page),
        fetchSuccessAction.page
      )
    ).toMatchSnapshot();
  });

  it("adds failed[action.request.name] = action.cause on fetchFailAction", () => {
    expect(reducer(reducer(undefined, {}), fetchFailAction)).toMatchSnapshot();
  });

  it("removes request.name from failed if present, on fetchResource", () => {
    const before = {
      pending: [],
      failed: {}
    };

    const after = reducer(before, fetchFailAction);
    expect(
      Object.keys(reducer(after, fetchResourceAction.page).failed)
    ).toHaveLength(0);
  });

  it('uses a generic "error" string if action.cause is falsy', () => {
    const action = Object.assign({}, fetchFailAction);

    delete action.cause;

    expect(reducer(reducer(undefined, {}), action)).toMatchSnapshot();
  });
});
