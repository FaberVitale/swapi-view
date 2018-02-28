import { default as reducer } from "./index";

describe("reducers/index", () => {
  it("initial state  matches the snapshot", () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });
});
