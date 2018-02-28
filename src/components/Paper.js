import React from "react";
import theme from "../styles/theme";

type Props = {
  element?: string,
  children: Array<React.Element<*>>
};

const containerProps = {
  className: "paper",
  style: { ...theme.paper }
};

//not a css prop and in 0.20.0 (this version of MUI) has a newline after the comma
delete containerProps.style.zDepthShadows;

class Paper extends React.Component<Props> {
  render() {
    const { children, element, className, style, ...rest } = this.props;

    const resProps = {
      style: Object.assign({}, containerProps.style, style),
      className: className
        ? `${className} ${containerProps.className}`
        : containerProps.className,
      ...rest
    };

    return React.createElement(element || "div", resProps, children);
  }
}

export default Paper;
