import NavigationLink from "./NavigationLink";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { shallow } from "enzyme";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

describe("components/NavigationLink", () => {
  const ContextProviders = ({ children }) => (
    <MuiThemeProvider theme={theme}>
      <MemoryRouter initialEntries={["/", "/a"]} initialIndex={0}>
        {children}
      </MemoryRouter>
    </MuiThemeProvider>
  );

  const icon = <i />;
  const to = "/a";
  let top, button;

  top = shallow(
    <ContextProviders>
      <NavigationLink to={to} />} />
    </ContextProviders>
  );

  button = top.find(NavigationLink).dive();

  it("renders the correct button, depending on the value of label and icon", () => {
    const count = wrapper => [
      wrapper.find(FlatButton).length,
      wrapper.find(IconButton).length
    ];
    expect(count(button)).toEqual([0, 0]);
    expect(count(button.setProps({ label: "2" }))).toEqual([1, 0]);
    expect(count(button.setProps({ icon }))).toEqual([1, 0]);
    expect(count(button.setProps({ label: "e", icon }))).toEqual([1, 0]);
  });

  it("sets <Link to={to} /> as containerElement ", () => {
    const containerElement = button.props().containerElement;

    expect(containerElement.props.to).toBe(to);
    expect(containerElement.type.name).toBe("Link");
  });
});
