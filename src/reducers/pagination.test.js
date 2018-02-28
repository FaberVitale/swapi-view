import pagination from "./pagination";
import { fetchSuccessAction as action } from "../__mocks__/action";

describe("reducers/pagination", () => {
  it("provides the initial state if undefined is passed", () => {
    expect(pagination(undefined, {})).toEqual({});
  });

  it("returns the previous state if an action that isnt FETCH_SUCCESS is passed", () => {
    expect(pagination({}, { type: "any" })).toEqual({});
  });

  it("does not store a fetchSuccessAction that isnt a page", () => {
    const initState = {};
    expect(pagination(initState, action.item)).toBe(initState);
  });

  it("does not store a fetchSuccess action that doesnt have a request object", () => {
    const invalidAction = {
      type: action.type
    };
    const state = {};
    expect(pagination(state, invalidAction)).toBe(state);
  });
  it("stores a page using request.name as key", () => {
    const result = Object.assign({}, action.page.data);

    result.items = result.ids;
    delete result.results;
    delete result.ids;

    expect(pagination({}, action.page)).toEqual({
      [action.page.request.name]: result
    });
  });
});
