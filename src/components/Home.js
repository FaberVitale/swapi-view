//@flow
import React from "react";
import Paper from "./Paper";
import SearchWidgetContainer from "../containers/SearchWidgetContainer";
import theme from "../styles/theme";

type Props = {
  loaded: boolean,
  url: null | string
};

type State = {
  divProps: {
    className: string,
    style: { backgroundImage?: string }
  }
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { url, loaded } = this.props;

    // if image is already downloaded show it without animation otherwise
    // keep the image container hidden
    this.state = {
      divProps: {
        className: loaded ? "image-container" : "image-container hidden",
        style:
          loaded && typeof url === "string"
            ? { backgroundImage: `url(${url})` }
            : {}
      }
    };
  }

  //show image if it has been loaded
  componentWillReceiveProps({ loaded, url }: Props) {
    if (!this.props.loaded && loaded && typeof url === "string") {
      this.setState({
        divProps: {
          className: "image-container fade-in",
          style: { backgroundImage: `url(${url})` }
        }
      });
    }
  }

  render() {
    return (
      <Paper className="home-container" style={theme.homePaper}>
        <div {...this.state.divProps} />
        <div className="home-form-container flex-column justify-flex-start align-items-center">
          <h4>All the Star Wars facts at your finger tips</h4>
          <SearchWidgetContainer
            push={() => {}}
            selected={"people"}
            page="1"
            text=""
          />
        </div>
      </Paper>
    );
  }
}

export default Home;
