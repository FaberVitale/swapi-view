import React from "react";
import NavMenu from "./NavMenu";
import Renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

describe("components/NavMenu", () => {
  const tree = Renderer.create(
    <MuiThemeProvider muiTheme={theme}>
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <NavMenu url="/" visible={true} onLinkClick={() => {}} />
      </MemoryRouter>
    </MuiThemeProvider>
  ).toJSON();

  it("matches the snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
