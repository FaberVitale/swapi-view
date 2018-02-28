import drawer from "./drawer";
import { drawerAction } from "../__mocks__/action";

describe("reducers/drawer", () => {
  it("returns the initial state if undefined is passed, false", () => {
    expect(drawer(undefined, {})).toBe(false);
  });

  it("changes the state if REQUEST_CHANGE_DRAWER action is passed", () => {
    expect(drawer(false, drawerAction)).toBe(true);
  });
});
