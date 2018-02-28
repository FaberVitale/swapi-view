//@flow
import theme from "../styles/theme";
import React from "react";
type Props = {
  text: string
};

/* non interactive replacement of Mui chip */
class Chip extends React.PureComponent<Props> {
  render() {
    return (
      <div className="chip-container" style={theme.chip}>
        <span className="chip-span">
          <strong>{this.props.text}</strong>
        </span>
      </div>
    );
  }
}

export default Chip;
