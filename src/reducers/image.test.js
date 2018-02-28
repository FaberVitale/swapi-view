import { default as reducer, statusEnum } from "./image";
import { loadImage, failToLoadImage, saveImageURL } from "../action/creators";
describe("reducers/image", () => {
  const initState = {
    url: null,
    status: statusEnum.IDLE
  };

  const url = "@test/imageURL";

  const saved = reducer(initState, saveImageURL(url));

  it("returns the initial state if undefined is provided", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("saves successfully the url of an image", () => {
    expect(reducer(initState, saveImageURL(url))).toEqual({
      url,
      status: statusEnum.SUCCESS
    });
  });

  it("updates correctly the status on load", () => {
    expect(reducer(initState, loadImage())).toEqual({
      url: null,
      status: statusEnum.LOADING
    });
  });
  it("updates correctly the status on fail", () => {
    expect(reducer(initState, failToLoadImage())).toEqual({
      url: null,
      status: statusEnum.FAIL
    });
  });

  it("ignores fail or load dispatches if url is string", () => {
    expect(reducer(saved, loadImage())).toBe(saved);

    expect(reducer(saved, failToLoadImage())).toBe(saved);
  });
});
