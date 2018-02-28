//@flow
import React from "react";
import Paper from "./Paper";
import LinkList from "./LinkList";
import PaginationWidget from "./PaginationWidget";
import theme from "../styles/theme";

type Props = {
  id: string,
  next: string | null,
  previous: string | null,
  firstPage: string | null,
  names: Array<string>,
  links: Array<string>
};

class SearchResult extends React.Component<Props> {
  static noResults = (
    <p className="no-results-p" style={theme.noResults}>
      {"Dang it!"}
      <br />
      {"0 results found."}
    </p>
  );

  render() {
    const empty = this.props.names.length === 0;
    let content;

    if (empty) {
      content = SearchResult.noResults;
    } else {
      content = <LinkList labels={this.props.names} links={this.props.links} />;
    }

    return (
      <Paper element="section" className="fade-in">
        <div className="toolbar align-items-center justify-space-between">
          <h4>results</h4>
          <div className="align-items-center flex-row justify-flex-end">
            {
              <PaginationWidget
                next={this.props.next}
                previous={this.props.previous}
                id={this.props.id}
                firstPage={this.props.firstPage}
              />
            }
          </div>
        </div>
        {content}
      </Paper>
    );
  }
}

export default SearchResult;
