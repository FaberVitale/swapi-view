//@flow
import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import About from "../components/About";
import FileNotFound from "../components/FileNotFound";
import { paths } from "../routes";
import ItemContainer from "./ItemContainer";
import PageContainer from "./PageContainer";
import HomeContainer from "./HomeContainer";
import SearchPageContainer from "./SearchPageContainer";
import { connectDrawer as connect } from "../util/reactReduxConfig";

/* Component in charge of routing inside the application
 *  non matching routes are redirected to /404
 */

type Props = {
  isOpen: boolean
};

class Main extends Component<Props> {
  render() {
    return (
      <main id="main" aria-hidden={this.props.isOpen}>
        <Switch>
          <Route exact path={paths.home} component={HomeContainer} />
          <Route exact path={paths.about} component={About} />
          <Route exact path={paths.search} component={SearchPageContainer} />
          <Route exact path={paths.pages} component={PageContainer} />
          <Route exact path={paths.item} component={ItemContainer} />
          <Route exact path={paths.wookiee} component={ItemContainer} />
          <Route path={paths.fileNotFound} component={FileNotFound} />
          <Redirect exact from="*" to={paths.fileNotFound} />
        </Switch>
      </main>
    );
  }
}

//we need to wrap it withRouter to force a re-render if the url changes
export default withRouter(connect(false)(Main));
