import {
  FETCH_RESOURCE,
  FETCH_SUCCESS,
  REQUEST_CHANGE_DRAWER,
  FETCH_FAIL
} from "../../action/types";

import { api } from "../../requestOptions";

export const fetchResourceAction = {
  page: {
    type: FETCH_RESOURCE,
    request: {
      name: "/people/page/5",
      type: "page",
      init: api,
      url: "https://swapi.co/api/people?page=5",
      query: null,
      match: {
        url: "/people/page/5",
        params: {
          endpoint: "people",
          type: "page",
          id: "5"
        }
      },
      shouldInvalidate: false
    }
  },
  item: {
    type: FETCH_RESOURCE,
    request: {
      name: "/people/item/5",
      type: "item",
      url: "https://swapi.co/api/people/5",
      init: api,
      query: null,
      match: {
        url: "/people/item/5",
        params: {
          endpoint: "people",
          type: "item",
          id: "5"
        }
      },
      shouldInvalidate: false
    }
  },
  wookiee: {
    type: FETCH_RESOURCE,
    request: {
      init: api,
      name: "/people/wookiee/5",
      type: "wookiee",
      url: "https://swapi.co/api/people/5?format=wookiee",
      query: null,
      match: {
        url: "/people/wookiee/5",
        params: {
          endpoint: "people",
          type: "wookiee",
          id: "5"
        }
      },
      shouldInvalidate: false
    }
  },
  search: {
    type: "FETCH_RESOURCE",
    request: {
      init: api,
      name: "/people/search/abba/1",
      url: "https://swapi.co/api/people?search=abba&page=1",
      query: {
        q: "abba",
        page: "1"
      },
      match: {
        path:
          "/:endpoint(people|planets|films|species|vehicles|starships)/:type(search)",
        url: "/people/search",
        isExact: true,
        params: {
          endpoint: "people",
          type: "search"
        }
      },
      type: "search",
      shouldInvalidate: false
    }
  }
};

export const fetchFailAction = {
  type: FETCH_FAIL,
  request: {
    name: "/people/page/5"
  },
  cause: "500"
};

export const fetchSuccessAction = {
  page: {
    type: FETCH_SUCCESS,
    request: {
      init: api,
      type: "page",
      name: "/people/page/5",
      query: null,
      match: {
        url: "/people/page/5",
        params: {
          endpoint: "people",
          type: "page",
          id: "5"
        }
      }
    },
    data: {
      previous: "/people/page/4",
      next: "/people/page/6",
      ids: ["/people/item/1", "/people/item/2"],
      results: [
        { data: {}, meta: { url: "1" }, links: {} },
        { data: {}, meta: { url: "2" }, links: {} }
      ]
    }
  },

  item: {
    type: FETCH_SUCCESS,
    request: {
      init: api,
      type: "item",
      name: "people/item/2",
      query: null,
      match: {
        url: "people/item/2",
        params: {
          endpoint: "people",
          type: "item",
          id: "2"
        }
      }
    },
    data: { data: {}, meta: {}, links: {} }
  },

  wookiee: {
    type: FETCH_SUCCESS,
    request: {
      init: api,
      type: "wookiee",
      name: "people/wookiee/2",
      query: null,
      match: {
        url: "people/wookiee/2",
        params: {
          endpoint: "people",
          type: "wookiee",
          id: "2"
        }
      }
    },
    data: { data: {}, meta: {}, links: {} }
  },
  search: {
    type: "FETCH_SUCCESS",
    request: {
      init: api,
      name: "/people/search/luke/1",
      url: "https://swapi.co/api/people/?search=luke&page=1",
      query: {
        q: "luke",
        page: "1"
      },
      match: {
        path:
          "/:endpoint(people|planets|films|species|vehicles|starships)/:type(search)",
        url: "/people/search",
        isExact: true,
        params: {
          endpoint: "people",
          type: "search"
        }
      },
      type: "search",
      shouldInvalidate: false
    },
    data: {
      next: null,
      previous: null,
      ids: ["/people/item/1"],
      results: [
        {
          meta: {
            created: "2014-12-09T13:50:51.644000Z",
            edited: "2014-12-20T21:17:56.891000Z",
            url: "https://swapi.co/api/people/1/"
          },
          data: {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "19BBY",
            gender: "male"
          },
          links: {
            homeworld: "https://swapi.co/api/planets/1/",
            films: [
              "https://swapi.co/api/films/2/",
              "https://swapi.co/api/films/6/",
              "https://swapi.co/api/films/3/",
              "https://swapi.co/api/films/1/",
              "https://swapi.co/api/films/7/"
            ],
            species: ["https://swapi.co/api/species/1/"],
            vehicles: [
              "https://swapi.co/api/vehicles/14/",
              "https://swapi.co/api/vehicles/30/"
            ],
            starships: [
              "https://swapi.co/api/starships/12/",
              "https://swapi.co/api/starships/22/"
            ]
          }
        }
      ]
    }
  }
};

export const drawerAction = {
  type: REQUEST_CHANGE_DRAWER,
  value: true
};
