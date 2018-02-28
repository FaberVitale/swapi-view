import { getQueryValue, getQuery, mapQueryToName } from "./query";
import { equals } from "../util/functions";

describe("util/query", () => {
  const parsed = { q: "20", arr: ["40", "50"] };

  describe("query/getQUeryValue", () => {
    it("returns null if not present", () => {
      expect(getQueryValue(parsed, "notPresent")).toBe(null);
      expect(getQueryValue(parsed, "notPresent", /\w+/)).toBe(null);
    });

    it("returns the value, if present and regex is not passed", () => {
      expect(getQueryValue(parsed, "q")).toBe("20");
    });

    it("returns the value, if present and if matches the regex", () => {
      expect(getQueryValue(parsed, "q", /\d{1,2}/)).toBe("20");
    });

    it("returns null, if present but doesnt not match the regex", () => {
      expect(getQueryValue(parsed, "q", /[A-Z]+/)).toBe(null);
    });

    test("if key is points to an array, returns null", () => {
      expect(getQueryValue(parsed, "arr")).toBe(null);
    });
  });

  describe("query/getQuery", () => {
    it("returns null if search is not string or is an empty string", () => {
      expect(
        [null, undefined, 0, /ab/, ""].map(r => getQuery(r)).every(equals(null))
      ).toBe(true);
    });

    it("processes correctly string with question mark", () => {
      expect(getQuery("?q=asd&page=2")).toEqual({
        q: "asd",
        page: "2"
      });
    });

    it("returns null if it doesnt contain q", () => {
      expect(getQuery("page=20")).toBe(null);
    });

    it("sets page to 1 if it is not provided", () => {
      expect(getQuery("q=asdf")).toEqual({
        q: "asdf",
        page: "1"
      });
    });

    it("returns the correct query object, if a valid query string is provided", () => {
      expect(getQuery("page=3&q=etgc")).toEqual({
        q: "etgc",
        page: "3"
      });
    });
  });

  describe("query/mapQueryToName", () => {
    it("works correctly", () => {
      expect(mapQueryToName("people", { q: "a", page: "2" })).toMatchSnapshot();

      expect(mapQueryToName("people", null)).toMatchSnapshot();
    });
  });
});
