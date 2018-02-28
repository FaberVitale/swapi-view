//@flow
import item from "../__mocks__/api/item";
import page from "../__mocks__/api/page";
import wookiee from "../__mocks__/api/wookiee";
import search from "../__mocks__/api/search";
import emptySearch from "../__mocks__/api/emptySearch";
/* we use this async function to do offline testing 
 * given a type requested it always returns an object
 *  with the same type taken from __mock__/api
 */

export const fetchDataMock = (timeout: number = 10000) => {
  return async (url: string) => {
    if (/\?search/.test(url)) {
      if (url.indexOf("empty") > -1) {
        return emptySearch;
      }
      return search;
    }

    if (url.indexOf("wookiee") > -1) {
      return wookiee;
    } else if (url.indexOf("page") > -1) {
      return page;
    }

    return item;
  };
};
