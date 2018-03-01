//@flow
import React, { PureComponent } from "react";
import { connectDrawer as connect } from "../util/reactReduxConfig";
import Menu from "material-ui/svg-icons/navigation/menu";
import IconButton from "material-ui/IconButton";
import theme from "../styles/theme";

type Props = {
  toggleDrawer: (val: boolean) => void,
  isOpen: boolean
};
/* An AppBar that has a left menu icon and a title next to it,
 * its named export is just for testing and
 * its button opens the drawer
 */
export class Topbar extends PureComponent<Props> {
  onIconClick = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault();
    this.props.toggleDrawer(true);
  };

  render() {
    return (
      <header
        className="topbar justify-space-between align-items-center"
        style={theme.topBar}
        aria-hidden={this.props.isOpen}
      >
        <div className="flex-row align-items-center justify-flex-start">
          <IconButton
            aria-label="open menu"
            aria-expanded={this.props.isOpen}
            onClick={this.onIconClick}
          >
            <Menu />
          </IconButton>
          <h1 style={theme.h1}>Swapi View</h1>
        </div>
      </header>
    );
  }
}

export default connect(true)(Topbar);
