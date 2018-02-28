//@flow
import { getCurried } from "../util/functions";

type paramSelector = (request: FetchRequest) => string;

export const getEndpoint: paramSelector = getCurried(
  ["request", "match", "params", "endpoint"],
  ""
);

export const getType: paramSelector = getCurried(["request", "type"], "");
