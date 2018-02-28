import byId from "./byId";
import { fetchSuccessAction } from "../__mocks__/action";

describe("reducers/byId", () => {
  it("provides the initial state in undefined is passed, an empty object", () => {
    expect({}).toEqual({});
  });

  it("returns the previous state if an action that isnt FETCH_SUCCESS is passed", () => {
    expect(byId({}, { type: " any" })).toEqual({});
  });

  it("stores data of a fetchSuccess action using request.name as key", () => {
    const name = fetchSuccessAction.item.request.name;
    const data = fetchSuccessAction.item.data;

    expect(byId({}, fetchSuccessAction.item)).toEqual({ [name]: data });
  });

  it("stores data of a listing using the value of ids as keys of items in results", () => {
    const results = fetchSuccessAction.page.data.results;
    const ids = fetchSuccessAction.page.data.ids;

    const expected = ids.reduce((obj, id, index) => {
      obj[id] = results[index];
      return obj;
    }, {});

    expect(byId({}, fetchSuccessAction.page)).toEqual(expected);
  });
});
