import * as data from "./data";
import page from "../__mocks__/api/page";
import item from "../__mocks__/api/item";
import wookiee from "../__mocks__/api/wookiee";

describe("util/data", () => {
  test("transformItem", () => {
    expect(data.transformItem(item)).toMatchSnapshot();
    expect(data.transformItem(wookiee)).toMatchSnapshot();
  });

  test("transformPage", () => {
    expect("transformPage", () => {
      expect(data.transformItem(page)).toMatchSnapshot();
    });
  });
});
