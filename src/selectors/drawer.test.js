import reducer from "../reducers";
import { isDrawerOpen } from "./drawer";
import { drawerRequestChange } from "../action/creators";

describe("selectors/drawer", () => {
  const initState = reducer(undefined, {});
  const openDrawer = reducer(initState, drawerRequestChange(true));

  test("isDrawerOpen", () => {
    expect(isDrawerOpen(initState)).toBe(false);

    expect(isDrawerOpen(openDrawer)).toBe(true);
  });
});
