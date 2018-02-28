import { transformItem, transformPage } from "../util/data";
import item from "../__mocks__/api/item";
import wookiee from "../__mocks__/api/wookiee";
import page from "../__mocks__/api/page";

import * as selectors from "./item";

describe("selectors/item", () => {
  let itemTr, wookieeTr, pageTr;

  const mockRequest = {
    type: "page",
    match: { params: { endpoint: "e", id: "1" } }
  };

  beforeAll(() => {
    itemTr = transformItem(item);
    wookieeTr = transformItem(wookiee);
    pageTr = transformPage(mockRequest, page);

    pageTr.items = pageTr.ids;
    delete pageTr.ids;
  });

  test("getItemName", () => {
    expect(selectors.getItemName(undefined)).toBe("");
    expect(selectors.getItemName({})).toBe("");
    expect(selectors.getItemName(itemTr)).toBe(item.name);
    expect(selectors.getItemName(wookieeTr)).toBe(wookiee.whrascwo);
  });

  test("getEditedKey", () => {
    expect(selectors.getEditedKey(undefined)).toBe("");
    expect(selectors.getEditedKey({})).toBe("");
    expect(selectors.getEditedKey(itemTr)).toBe("edited");
    expect(selectors.getEditedKey(wookieeTr)).toBe("wowaahaowowa");
  });

  test("getItemNamesOfPage", () => {
    const itemNames = page.results.reduce((arr, { name }) => {
      arr.push(name);
      return arr;
    }, []);

    const itemObj = pageTr.items.reduce((obj, id, index) => {
      obj[id] = transformItem(page.results[index]);
      return obj;
    }, {});

    expect(selectors.getItemNamesOfPage(pageTr, itemObj)).toEqual(itemNames);
  });
});
