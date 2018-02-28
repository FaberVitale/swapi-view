//@flow
import { warn } from "./functions";

/* Thrown when a GET request returns with a status !== 200.
 * based on https://stackoverflow.com/a/5251506
 */
export function ApiError(url: string, status: number) {
  this.url = url;
  this.status = status;
  this.name = "ApiError";
  this.message = `url: ${url}, status: ${status}`;
  this.stack = new Error().stack;
}
// $FlowFixMe
ApiError.prototype = new Error();

/* higher order function that given an optional timeout
  returns a fetch-like function that
  on fulfill will returns the response,
  on rejection returns the following errors:
  
  1 - TypeError: Network error or Permission error
  2 - ApiError: If the response status isnt 200
  3 - SyntaxError: Invalid JSON
  4 - an Error with message "timeout" if the request is hanging
  5 - RangeError - If the response status isnt in range [200; 599]

  spec: https://fetch.spec.whatwg.org/
*/
export const fetchData = (timeout?: number = 10000) => {
  let wait: number;

  if (!Number.isSafeInteger(timeout) || timeout < 500) {
    warn(
      `timeout is not a valid number:
       expected an Integer in range [500, 2^31 -1], got: ${timeout}
       timeout set to 10s`
    );
    wait = 10000;
  }
  wait = timeout;

  return async (url: string | URL, init?: RequestOptions) => {
    let res;

    res = await new Promise((resolve, reject) => {
      let tRef = setTimeout(() => {
        reject(new Error("timeout"));
      }, wait);

      const req = init ? fetch(url, init) : fetch(url);

      req.then(response => {
        clearTimeout(tRef);
        resolve(response);
      }, reject);
    });

    if (res.status === 200) {
      return res;
    }

    throw new ApiError(
      typeof url !== "string" ? url.toString() : url,
      res.status
    );
  };
};
