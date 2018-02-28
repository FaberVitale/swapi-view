import * as fn from "./functions";

describe("util/functions", () => {
  let obj;

  beforeAll(() => {
    obj = {};
  });
  test("identity: (a: mixed) => a", () => {
    expect(fn.identity(obj)).toBe(obj);
    expect(fn.identity(obj)).not.toBe({});
  });

  test("equals (a: mixed) => (b: mixed) => boolean", () => {
    expect(fn.equals(obj)(obj)).toBe(true);
    expect(fn.equals(obj)({})).toBe(false);
  });

  test("notEqual (a:mixed) => (b: mixed) => boolean", () => {
    expect(fn.notEqual(obj)(obj)).toBe(false);

    expect(fn.notEqual(obj)({})).toBe(true);
  });

  test("equalsTo (...args Array<mixed>) => (val: mixed) => boolean", () => {
    expect(fn.equalsTo(obj, {}, "")(obj)).toBe(true);
    expect(fn.equalsTo()(obj)).toBe(false);
    expect(fn.equalsTo({})(obj)).toBe(false);
  });

  test("isTruthy (val: mixed) => boolean", () => {
    const falsy = [null, "", undefined, 0, NaN];
    const truthy = [{}, 234, "er", () => {}, /a?b/];

    expect(falsy.some(fn.isTruthy)).toBe(false);

    expect(truthy.every(fn.isTruthy)).toBe(true);
  });

  test("getDisplayName", () => {
    expect(fn.getDisplayName("A", {})).toBe("withA(Component)");
    expect(fn.getDisplayName("A", { name: "B" })).toBe("withA(B)");
    expect(fn.getDisplayName("A", { name: "B", displayName: "C" })).toBe(
      "withA(C)"
    );
  });
});
