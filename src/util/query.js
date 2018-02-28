//@flow
import qs from "qs";
import { queryRegex, qsOpt } from "../routes";
import { warn } from "../util/functions";

/* returns the string query if present, null otherwise
 * Note: it doesnt support array params
 */
export const qsStringify = (arg?: {} = {}) => qs.stringify(arg, qsOpt);

export const getQueryValue = (parsed: {}, key: string, regex?: RegExp) => {
  let value: string;
  let temp: string | Array<string> = parsed[key] || "";

  if (!temp || typeof temp !== "string") {
    return null;
  }

  value = temp;

  if (regex) {
    return regex.test(value) ? value : null;
  }

  return value;
};

//parses and validates the query using queryRegex
export const getQuery = (search: string) => {
  let parsed, query;

  if (typeof search !== "string" || !search) {
    return null;
  }

  query = search[0] === "?" ? search.slice(1) : search;

  try {
    parsed = qs.parse(query);
  } catch (e) {
    warn(e);
  }

  if (parsed) {
    const q = getQueryValue(parsed, "q", queryRegex.q) || "";
    const page = getQueryValue(parsed, "page", queryRegex.page) || "1";

    if (q) {
      return {
        q,
        page
      };
    }
  }

  return null;
};

//returns the pathname + search part of the url  of the result query
export const mapQueryToName = (
  endpoint: string,
  query: { q: string, page: string } | null
) => {
  if (query) {
    const stringified = qsStringify(query);

    return `/${endpoint}/search?${stringified}`;
  } else {
    return `/${endpoint}/search`;
  }
};
