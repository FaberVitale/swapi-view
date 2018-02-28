//@flow
import React from "react";
import NavigationLink from "./NavigationLink";
import BackButton from "./BackButton";

type Props = {
  route: string
};

/* Navigation widget used in Item */
class NavItemWidget extends React.Component<Props> {
  render() {
    let to, label;

    if (/\/item\//.test(this.props.route)) {
      to = this.props.route.replace("item", "wookiee");
      label = "Wookiee";
    } else {
      to = this.props.route.replace("wookiee", "item");
      label = "Item";
    }

    return (
      <div className="flex-row align-items-center">
        <BackButton />
        <NavigationLink to={to} disabled={false} label={label} replace={true} />
      </div>
    );
  }
}

export default NavItemWidget;
