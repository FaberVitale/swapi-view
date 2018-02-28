//@flow
import SearchPage from "../components/SearchPage";
import { getQuery } from "../util/query";
import { mapProps } from "recompose";
import type { Location, Match, History } from "react-router-dom";

type Props = {
  match: Match,
  location: Location,
  history: History
};

// named export used just for testing
export const hoc = mapProps(({ match, location, history }: Props) => {
  const query = getQuery(location.search);

  return {
    endpoint: match.params.endpoint,
    q: query && query.q,
    page: query && query.page
  };
});

export default hoc(SearchPage);
