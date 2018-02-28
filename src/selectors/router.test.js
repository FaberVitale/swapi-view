import * as selector from "./router";
import { fetchSuccessAction } from "../__mocks__/action";

describe("selectors/router", () => {
  const endpoint = fetchSuccessAction.item.request.match.params.endpoint;

  test("getEndpoint", () => {
    expect(selector.getEndpoint(fetchSuccessAction.item)).toBe(endpoint);
    expect(selector.getEndpoint({})).toBe("");
  });

  test("getType", () => {
    const type = fetchSuccessAction.item.request.type;

    expect(selector.getType(fetchSuccessAction.item)).toBe(type);
    expect(selector.getType({})).toBe("");
  });
});
