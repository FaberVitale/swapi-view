import React from "react";
import { Topbar } from "./Topbar";
import Renderer from "react-test-renderer";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

describe("components/Topbar", () => {
  const toggleDrawer = jest.fn();

  const close = Renderer.create(
    <MuiThemeProvider muiTheme={theme}>
      <Topbar isOpen={false} toggleDrawer={toggleDrawer} />
    </MuiThemeProvider>
  ).toJSON();

  const open = Renderer.create(
    <MuiThemeProvider muiTheme={theme}>
      <Topbar isOpen={true} />
    </MuiThemeProvider>
  ).toJSON();

  it("matches the snapahot", () => {
    expect(close).toMatchSnapshot();

    expect(open).toMatchSnapshot();
  });
});
