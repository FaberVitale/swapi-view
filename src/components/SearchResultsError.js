import React from "react";
import Paper from "./Paper";
import theme from "../styles/theme";

type Props = {
  error: string,
  search: string
};

class SearchResultsError extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.error !== nextProps.error ||
      this.props.search !== nextProps.search
    );
  }
  render() {
    // it doesnt show, if no params are passed
    if (this.props.search === "") {
      return null;
    }

    const msg =
      this.props.error === "invalid query"
        ? "Invalid Query"
        : "An error has occurred";

    return (
      <Paper element="section" className="fade-in">
        <div className="toolbar align-items-center justify-space-between">
          <h4>results</h4>
        </div>
        <p className="no-results-p" style={theme.noResults}>
          {msg}
        </p>
      </Paper>
    );
  }
}

export default SearchResultsError;
