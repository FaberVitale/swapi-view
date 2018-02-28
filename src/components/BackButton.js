//@flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { Match, History, Location } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import ArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import theme from "../styles/theme";

type Props = {
  match: Match,
  history: History,
  location: Location
};

type ButtonProps = {
  onClick: () => void,
  "aria-label": string,
  iconStyle?: {
    fill: string
  }
};

class BackButton extends React.Component<Props> {
  static focusStyle = {
    fill: theme.palette.primary2Color
  };

  shouldComponentUpdate(prevProps: Props) {
    return prevProps.history.goBack !== this.props.history.goBack;
  }

  render() {
    const buttonProps: ButtonProps = {
      onClick: this.props.history.goBack,
      "aria-label": "go back"
    };

    return (
      <IconButton {...buttonProps}>
        <ArrowBack />
      </IconButton>
    );
  }
}

export default withRouter(BackButton);
