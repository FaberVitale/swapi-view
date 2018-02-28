//@flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { History, Location, Match } from "react-router-dom";

type Props = {
  match: Match,
  location: Location,
  history: History
};
//based on: https://reacttraining.com/react-router/web/guides/scroll-restoration
class ScrollOnPathnameChange extends React.Component<Props> {
  hasScrollTo = typeof window.scrollTo === "function";

  shouldComponentUpdate(prevProps: Props) {
    return (
      this.hasScrollTo &&
      this.props.location.pathname !== prevProps.location.pathname
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.hasScrollTo &&
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollOnPathnameChange);
