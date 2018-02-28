//@flow
import React from "react";
import CircularProgress from "material-ui/CircularProgress";

type Props = {
  containerClassName?: string
};

class Loading extends React.PureComponent<Props> {
  render() {
    const className =
      this.props.containerClassName || "loading flex-row align-items-center";
    return (
      <div className={className}>
        <CircularProgress size={70} thickness={7} />
      </div>
    );
  }
}

export default Loading;
