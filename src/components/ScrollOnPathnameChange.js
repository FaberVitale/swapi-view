//@flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { History, Location, Match } from "react-router-dom";

type Props = {
  match: Match,
  location: Location,
  history: History,
  id: string,
  pause: boolean
};
//based on: https://reacttraining.com/react-router/web/guides/scroll-restoration
class ScrollOnPathnameChange extends React.Component<Props> {
  elem: Element | null;

  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.id !== nextProps.id ||
      nextProps.pause !== this.props.pause
    ) {
      this.elem = document.getElementById(nextProps.id);
    }
  }

  componentDidMount() {
    this.elem = document.getElementById(this.props.id);
  }

  shouldComponentUpdate(prevProps: Props) {
    return this.props.location.pathname !== prevProps.location.pathname;
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.elem && !this.props.pause) {
      this.elem = document.getElementById(this.props.id);
    }

    if (this.elem && !this.props.pause) {
      this.elem.scrollTop = 0;
      this.elem.scrollLeft = 0;
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollOnPathnameChange);
