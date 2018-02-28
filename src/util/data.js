//@flow
const isMetaKey = (key: string) =>
  /^(?:created|url|edited|oarcworaaowowa|wowaahaowowa|hurcan)$/.test(key);
const isLink = value =>
  typeof value !== "string" || /^https?|acaoaoakc/.test(value);

const regex = /(\d+)\/?$/;
export const mapTypeToRoute = (
  type: string,
  endpoint: string,
  apiUrl: string,
  query?: { q: string, page: string } | null
) => {
  const res = regex.exec(apiUrl);

  if (type === "search" && query && res) {
    return `/${endpoint}/search/${query.q}/${res[1]}`;
  }

  return res && `/${endpoint}/${type}/${res[1]}`;
};

export const transformItem = (item: {}) =>
  Object.keys(item || {}).reduce(
    (aggr, key) => {
      const value = item[key];

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

export const transformPage = (
  request: FetchRequest,
  page: {
    next: string | null,
    previous: string | null,
    results: Array<{ url: string }>
  }
) => {
  const type = request.type;
  const { endpoint } = request.match.params;

  return {
    next: page.next && mapTypeToRoute(type, endpoint, page.next, request.query),
    previous:
      page.previous &&
      mapTypeToRoute(type, endpoint, page.previous, request.query),
    ids: page.results.map(item => mapTypeToRoute("item", endpoint, item.url)),
    results: page.results.map(transformItem)
  };
};
