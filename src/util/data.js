//@flow
const isMetaKey = (key: string) =>
  /^(?:created|url|edited|oarcworaaowowa|wowaahaowowa|hurcan)$/.test(key);
const isLink = value =>
  typeof value !== "string" || /^https?|acaoaoakc/.test(value);

const regex = /(\d+)\/?$/;

const UNMATCHED_ROUTE = "__UNMATCHED_ROUTE__";

export const mapTypeToRoute: (
  type: string,
  endpoint: string,
  apiUrl: string,
  query?: { q: string, page: string } | null
) => string = (type, endpoint, apiUrl, query) => {
  const res = regex.exec(apiUrl);

  if (type === "search") {
    if (query && res) {
      return `/${endpoint}/search/${query.q}/${res[1]}`;
    }
    return UNMATCHED_ROUTE;
  }

  return res ? `/${endpoint}/${type}/${res[1]}` : UNMATCHED_ROUTE;
};

export const transformItem: (item?: {}) => ItemData = item => {
  const input = item || {};

  return Object.keys(input).reduce(
    (aggr, key) => {
      const value = input[key];

      if (isMetaKey(key)) {
        aggr.meta[key] = value;
      } else if (isLink(value)) {
        aggr.links[key] = value;
      } else {
        aggr.data[key] = value;
      }
      return aggr;
    },
    { meta: {}, data: {}, links: {} }
  );
};

export const transformPage: (
  request: FetchRequest,
  page: {
    next: string | null,
    previous: string | null,
    results: Array<{ url: string }>
  }
) => * = (request, page) => {
  const type = request.type;
  const { endpoint } = request.match.params;

  const ids: Array<string> = page.results.map(item =>
    mapTypeToRoute("item", endpoint, item.url)
  );

  const results: Array<ItemData> = page.results.map(transformItem);

  return {
    next: page.next && mapTypeToRoute(type, endpoint, page.next, request.query),
    previous:
      page.previous &&
      mapTypeToRoute(type, endpoint, page.previous, request.query),
    ids,
    results
  };
};
