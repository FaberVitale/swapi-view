//@flow
import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import { withRouter } from "react-router-dom";
import { connectDrawer as connect } from "../util/reactReduxConfig";
import NavMenu from "./NavMenu";
import type { Location } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import Close from "material-ui/svg-icons/navigation/close";

type Props = {
  isOpen: boolean,
  toggleDrawer: (val: boolean) => void,
  location: Location
};

const linkSelector = 'a:not([aria-disabled="true"])';
const activator = ".App > header button";

/* A left side drawer that implements a11y features behaving like a modal,
 * see: https://www.w3.org/TR/wai-aria-practices/#dialog_modal
 * 
 * features: 
 *   - after the drawer is open, focus is set on the close button when is open
 *   - after the drawer is closed, focus is returned to the activator element
 *   - it prevents sr from escaping and implements a focus trap
 *   - sets the role dialog on the top element
 *   - onOpen sets the siblings to aria-hidden true and div[role="dialog"] to false
 */
class Sidebar extends Component<Props> {
  closeButton: HTMLElement;
  lastLink: HTMLElement;
  activator: HTMLElement;

  shouldComponentUpdate(nextProps) {
    const { isOpen, location, toggleDrawer } = this.props;

    return (
      nextProps.isOpen !== isOpen ||
      nextProps.location.pathname !== location.pathname ||
      nextProps.toggleDrawer !== toggleDrawer
    );
  }

  componentDidMount() {
    let maybeClose = document.getElementById("close-menu-button");
    let activeLinks = document.querySelectorAll(linkSelector);
    let maybeActivator = document.querySelector(activator);

    if (maybeClose) {
      this.closeButton = maybeClose;
      this.closeButton.addEventListener("keydown", this.handleKeyDownFirst);
    }

    if (activeLinks.length > 0) {
      this.lastLink = activeLinks[activeLinks.length - 1];
      this.lastLink.addEventListener("keydown", this.handleKeyDownLast);
    }

    if (maybeActivator) {
      this.activator = maybeActivator;
    }
  }

  handleRequestChange = (open: boolean, reason: string) => {
    if (this.props.isOpen !== open) {
      this.props.toggleDrawer(open);
    }
  };

  //we use these 2 listeners to implement the focus trap
  handleKeyDownFirst = (evt: KeyboardEvent) => {
    const { key, shiftKey } = evt;

    if (key === "Tab" && shiftKey) {
      evt.preventDefault();
      this.lastLink.focus();
    }
  };

  handleKeyDownLast = (evt: KeyboardEvent) => {
    const { key, shiftKey } = evt;

    if (key === "Tab" && !shiftKey) {
      evt.preventDefault();
      this.closeButton.focus();
    }
  };

  closeDrawer = (_?: mixed) => {
    this.props.toggleDrawer(false);
  };

  //on close focus is returned to the activtor, on open focus is set to the first link
  // if the last link gets disabled points this.lastLink to the last active link
  componentDidUpdate({ isOpen, location }: Props) {
    if (location.pathname !== this.props.location.pathname) {
      const links = document.querySelectorAll(linkSelector);

      if (links.length > 0) {
        const lastLink = links[links.length - 1];

        if (
          this.lastLink &&
          lastLink.getAttribute("href") !== this.lastLink.getAttribute("href")
        ) {
          this.lastLink.removeEventListener("keydown", this.handleKeyDownLast);
          this.lastLink = lastLink;
          this.lastLink.addEventListener("keydown", this.handleKeyDownLast);
        }
      }
    }

    if (!isOpen && this.props.isOpen && this.closeButton) {
      this.closeButton.focus();
    }

    if (isOpen && !this.props.isOpen && this.activator) {
      this.activator.focus();
    }
  }

  render() {
    return (
      <div
        id="drawer-container"
        aria-hidden={!this.props.isOpen}
        role="dialog"
        aria-label="menu"
      >
        <Drawer
          docked={false}
          open={this.props.isOpen}
          onRequestChange={this.handleRequestChange}
        >
          <IconButton
            id="close-menu-button"
            aria-label="close menu"
            onClick={this.closeDrawer}
            tabIndex={this.props.isOpen ? 0 : -1}
          >
            <Close />
          </IconButton>
          <NavMenu
            visible={this.props.isOpen}
            url={this.props.location.pathname}
            onLinkClick={this.closeDrawer}
          />
        </Drawer>
      </div>
    );
  }
}

export default connect(true)(withRouter(Sidebar));
