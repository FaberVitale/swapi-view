//@flow
import React from "react";
import Paper from "./Paper";
import theme from "../styles/theme";
import SearchWidgetContainer from "../containers/SearchWidgetContainer";
import SearchResultsContainer from "../containers/SearchResultsContainer";

type Props = {
  endpoint: string,
  q: string | null,
  page: string | null
};

class SearchPage extends React.PureComponent<Props> {
  render() {
    const { q, endpoint, page } = this.props;
    const isValid = !!q;

    return (
      <article>
        <Paper elem="div">
          <header className="toolbar align-items-center justify-space-between">
            <h2 style={theme.h2}>Search</h2>
          </header>
          <div className="search-form-container">
            <SearchWidgetContainer
              selected={endpoint}
              page={page}
              text={isValid ? q : ""}
            />
          </div>
        </Paper>
        <SearchResultsContainer endpoint={endpoint} page={page} q={q} />
      </article>
    );
  }
}

export default SearchPage;
