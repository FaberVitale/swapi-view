import * as sel from "./image";
import reducer from "../reducers";
import { failToLoadImage, saveImageURL, loadImage } from "../action/creators";
import { statusEnum } from "../reducers/image";

describe("selectors/image", () => {
  const url = "blob:test.test";

  const initState = reducer(undefined, {});

  const loadingImage = reducer(initState, loadImage());

  const success = reducer(loadingImage, saveImageURL(url));

  const fail = reducer(loadingImage, failToLoadImage());

  test("getImageStatus", () => {
    expect(sel.getImageStatus(initState)).toBe(statusEnum.IDLE);

    expect(sel.getImageStatus(loadingImage)).toBe(statusEnum.LOADING);

    expect(sel.getImageStatus(success)).toBe(statusEnum.SUCCESS);

    expect(sel.getImageStatus(fail)).toBe(statusEnum.FAIL);
  });

  test("getImageURL", () => {
    expect(sel.getImageURL(initState)).toBe(null);

    expect(sel.getImageURL(loadingImage)).toBe(null);

    expect(sel.getImageURL(success)).toBe(url);

    expect(sel.getImageURL(fail)).toBe(null);
  });
});
