//@flow
import qs from "qs";

export const apiRoot = "https://swapi.co/api/";
export const endpoints = [
  "people",
  "planets",
  "films",
  "species",
  "vehicles",
  "starships"
];
export const firstPageOf = {
  people: "/people/page/1",
  planets: "/planets/page/1",
  films: "/films/page/1",
  species: "/species/page/1",
  vehicles: "/vehicles/page/1",
  starships: "/starships/page/1"
};
export const paths = {
  pages:
    "/:endpoint(people|planets|films|species|vehicles|starships)/:type(page)/:id([1-9]\\d?)",
  search:
    "/:endpoint(people|planets|films|species|vehicles|starships)/:type(search)",
  item:
    "/:endpoint(people|planets|films|species|vehicles|starships)/:type(item)/:id([1-9]\\d?)",
  wookiee:
    "/:endpoint(people|planets|films|species|vehicles|starships)/:type(wookiee)/:id([1-9]\\d?)",
  about: "/about",
  home: "/",
  fileNotFound: "/404"
};

export const qsOpt = {
  format: qs.formats.RFC1738
};

export const queryRegex = {
  q: /^.{2,45}$/,
  page: /^[1-9]$/
};

export const searchFieldsOf = {
  people: ["name"],
  planets: ["name"],
  films: ["title"],
  species: ["name"],
  vehicles: ["name", "model"],
  starships: ["name", "model"]
};
