import React from "react";
import ScrollOnPathnameChange from "./ScrollOnPathnameChange";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Route } from "react-router-dom";
describe("components/ScrollOnPathnameChange", () => {
  let root;
  let buttonId = "change-id";
  let push,
    testCompId = "test-comp",
    appId = "app";
  const containerStyle = {
    width: 200,
    height: 300,
    overflow: "scroll"
  };

  const childStyle = {
    width: 400,
    height: 500
  };

  const GetPush = ({ history }) => {
    push = history.push;
    return null;
  };

  class TestComp extends React.Component {
    render() {
      return (
        <div id="test-comp">
          <ScrollOnPathnameChange id={this.props.id} pause={false} />
          <div id="container-1" style={containerStyle}>
            <p style={childStyle}>{"elem"}</p>
          </div>
          <div id="container-2" style={containerStyle}>
            <p style={childStyle}>{"elem"}</p>
          </div>
        </div>
      );
    }
  }

  class TestApp extends React.Component {
    state = {
      id: "container-1"
    };

    handleClick = () => {
      this.setState({
        id: "container-2"
      });
    };

    render() {
      return (
        <Router initialEntries={["/"]} initialIndex={0}>
          <div id={appId}>
            <Route path="*" component={GetPush} />
            <div>
              <TestComp id={this.state.id} />
              <button type="button" id={buttonId} onClick={this.handleClick} />
            </div>
          </div>
        </Router>
      );
    }
  }

  beforeAll(() => {
    root = document.createElement("div");
    root.id = "root";

    document.body.appendChild(root);
    ReactDOM.render(<TestApp />, root);
  });

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(root);
    document.body.removeChild(root);
  });

  it("renders nothing", () => {
    expect(document.getElementById(testCompId).childElementCount).toBe(2);
  });

  it("scrolls to top on Pathname change", () => {
    let cont1 = document.getElementById("container-1");

    cont1.scrollTop = 100;
    cont1.scrollLeft = 100;

    push("/a/b");

    expect(cont1.scrollTop).toBe(0);
    expect(cont1.scrollLeft).toBe(0);
  });

  it("updates the element if props.id changes", () => {
    let button = document.getElementById(buttonId);

    button.click();

    let cont2 = document.getElementById("container-2");

    cont2.scrollTop = 100;
    cont2.scrollLeft = 100;

    push("/a/b/c");

    expect(cont2.scrollTop).toBe(0);
    expect(cont2.scrollLeft).toBe(0);
  });
});
