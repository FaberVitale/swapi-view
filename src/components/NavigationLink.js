//@flow
import * as React from "react";
import { Link } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import { warn } from "../util/functions";

type Props = {
  to: string,
  disabled?: boolean,
  label?: string,
  icon?: React.Element<*>,
  tabbable?: boolean
};

type LinkProps = {
  to: string,
  onClick: (e: MouseEvent) => void,
  className?: string,
  "aria-disabled"?: boolean
};

const buttonEnum = {
  INVALID_PROPS: 0,
  LABEL: 1,
  ICON: 2,
  LABEL_ICON: 3
};

const getButtonType = (icon, label) =>
  // $FlowFixMe
  (!!icon << 1) + (typeof label === "string");

/* Navigation button  that uses internally  react-router-dom <Link />
 * 
 * Renders a mui flatbutton if label and an optional icon are passed 
 * Renders an IconButton if only an icon is passed
 * Emits a warning and renders null if neither are passed.
 * 
*/
class NavigationLink extends React.Component<Props> {
  //<Link/> doesnt trigger links if the onClick function calls preventDefault.
  blockIfDisabled = (evt: MouseEvent) => {
    if (this.props.disabled) {
      evt.preventDefault();
    }
  };

  render() {
    const { label, icon, tabbable, ...rest } = this.props;

    const buttonType = getButtonType(icon, label);

    const linkProps: LinkProps = {
      to: this.props.to,
      onClick: this.blockIfDisabled
    };

    const nextProps = {
      ...rest
    };

    /* if a link is disabled: 
     * 1 - we block pointer events (IE11 supports it too)
     * 2 - we preventDefault if the browser doesnt support pointer-events
     * 3 - we notify  screen readers that this link is disabled (aria-disabled)
     * 4 - we pass to the mui button disabled=true to make it use the disabled style
     * 
     * otherwise:
     * 1 -  we set pointer-events to auto to prevent unwanted css inheritance
     * 2 -  if it has focus we add the specific focusStyle
    */
    if (this.props.disabled) {
      linkProps.className = "no-pointer-events";
      linkProps["aria-disabled"] = true;
      nextProps.disabled = true;
    } else {
      linkProps.className = "pointer-events-auto";
    }

    // we need to override flatbutton default 0 index
    if (typeof tabbable === "boolean" && !tabbable) {
      nextProps.tabIndex = -1;
    }

    nextProps.containerElement = <Link {...linkProps} />;

    switch (buttonType) {
      case buttonEnum.LABEL:
        return <FlatButton {...nextProps} label={label} />;
      case buttonEnum.ICON:
        return <IconButton {...nextProps}>{icon}</IconButton>;
      case buttonEnum.LABEL_ICON:
        nextProps.label = label;
        nextProps.icon = icon;
        return <FlatButton {...nextProps} />;
      default:
        warn(
          `NavigationLink requires at least an icon or a label prop,
           this component will render nothing`
        );
        return null;
    }
  }
}

export default NavigationLink;
