import React from "react";
import Renderer from "react-test-renderer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../styles/theme";
import NavItemWidget from "./NavItemWidget";
import { MemoryRouter } from "react-router-dom";

describe("components/NavItemWidget", () => {
  const item = Renderer.create(
    <MemoryRouter initialEntries={["/"]} iniitalIndex={0}>
      <MuiThemeProvider muiTheme={theme}>
        <NavItemWidget route="/people/item/5" />
      </MuiThemeProvider>
    </MemoryRouter>
  ).toJSON();

  const wookie = Renderer.create(
    <MemoryRouter initialEntries={["/"]} iniitalIndex={0}>
      <MuiThemeProvider muiTheme={theme}>
        <NavItemWidget route="/people/wookiee/5" />
      </MuiThemeProvider>
    </MemoryRouter>
  );

  it("matches the snapshots", () => {
    expect(item).toMatchSnapshot();
    expect(wookie).toMatchSnapshot();
  });
});
