//@flow
import React, { Component } from "react";
import configureStore from "../configureStore";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Main from "./Main";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import ScrollOnPathnameChange from "../components/ScrollOnPathnameChange";

type Props = {||};

type State = { firstRender: boolean };

const store = configureStore();

/* The app rendered
 * 
 * We use a 2 step rendering because we want react to hydrate the rendered shell 
 * and hydrate requires that the markup already present in our page matches the 
 * React Element passed.
 * 
 * Note that we use componentDidMount trigger a second render because
 * renderToString doesnt trigger componentDidMount hook.
*/
class App extends Component<Props, State> {
  state = {
    firstRender: true
  };

  componentDidMount() {
    //deferred to remove the flashing issue with firefox with content cached on refresh
    window.requestAnimationFrame(() => {
      this.setState({
        firstRender: false
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider muiTheme={theme}>
            <div className="App">
              <ScrollOnPathnameChange />
              <Topbar />
              {!this.state.firstRender && (
                <Sidebar firstRender={this.state.firstRender} />
              )}
              {!this.state.firstRender && <Main />}
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
