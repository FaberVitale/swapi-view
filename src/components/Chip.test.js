import React from "react";
import Renderer from "react-test-renderer";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Chip from "./Chip";

describe("components/Chip", () => {
  const Comp = (
    <MuiThemeProvider muiTheme={theme}>
      <Chip text="test" />
    </MuiThemeProvider>
  );

  const tree = Renderer.create(Comp).toJSON();

  it("matches the snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
