//@flow
import * as React from "react";
import { endpoints, firstPageOf, paths } from "../routes";
import NavigationLink from "./NavigationLink";
import Divider from "material-ui/Divider";

type Props = {
  visible: boolean,
  url: string,
  onLinkClick: () => void
};

const linkSelector = 'a:not([aria-disabled="true"])';
const clickableSelector = `${linkSelector}, ${linkSelector} *`;

class NavMenu extends React.Component<Props> {
  // we need to produce the same markup on the first render because it
  // has to match the shell in index.html
  static isLinkDisabled = (url: string, href: string) => {
    return url === href;
  };

  searchLink: string = endpoints.length > 0 ? `/${endpoints[0]}/search` : "";

  handleClick = ({ button, target, currentTarget }: SyntheticMouseEvent<*>) => {
    if (
      button ||
      target === currentTarget ||
      !(target instanceof HTMLElement) ||
      !target.matches(clickableSelector)
    ) {
      return;
    }
    this.props.onLinkClick();
  };

  render() {
    const { visible, url } = this.props;

    const homeProps = {
      key: 0,
      label: "Home",
      to: paths.home,
      disabled: NavMenu.isLinkDisabled(url, paths.home),
      tabbable: visible,
      fullWidth: true
    };

    const searchProps = {
      key: 1,
      label: "Search",
      to: this.searchLink,
      disabled: NavMenu.isLinkDisabled(url, this.searchLink),
      tabbable: visible,
      fullWidth: true
    };

    const aboutProps = {
      to: paths.about,
      disabled: paths.about === url,
      tabbable: visible,
      fullWidth: true,
      label: "About"
    };

    const list = [
      <NavigationLink {...homeProps} />,
      <NavigationLink {...searchProps} />
    ];

    for (let i = 0, len = endpoints.length; i < len; i++) {
      let endpoint = endpoints[i];
      const disabled = NavMenu.isLinkDisabled(url, firstPageOf[endpoint]);

      list.push(
        <NavigationLink
          key={endpoint}
          to={firstPageOf[endpoint]}
          disabled={disabled}
          label={endpoint}
          fullWidth={true}
          tabbable={visible}
        />
      );
    }

    return (
      <nav
        className="sidebar-nav flex-column justify-space-between"
        onClick={this.handleClick}
      >
        <div className="no-pointer-events">{list}</div>
        <div className="sidebar-bottom no-pointer-events">
          <Divider />
          <NavigationLink {...aboutProps} />
        </div>
      </nav>
    );
  }
}

export default NavMenu;
