//@flow
import _get from "lodash.get";

export const getCurried = (keys: Array<string>, or: any) => (val: Object) =>
  _get(val, keys, or);

export const identity = (id: mixed) => id;

export const notEqual = (a: mixed) => (b: mixed) => a !== b;

export const equals = (a: mixed) => (b: mixed) => a === b;

export const isTruthy = (val: mixed) => !!val;

export const equalsTo = (...args: Array<mixed>) => (val: mixed) =>
  args.some(equals(val));

export const getDisplayName = (hocName: string, Comp: any) =>
  `with${hocName}(${Comp.displayName || Comp.name || "Component"})`;

export const warn: (...msgs: Array<any>) => void =
  process.env.NODE_ENV !== "production" &&
  window.console &&
  typeof window.console.warn === "function"
    ? window.console.warn
    : () => {};
