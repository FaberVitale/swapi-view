import Loading from "./Loading";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { shallow } from "enzyme";
import React from "react";
import CircularProgress from "material-ui/CircularProgress";

describe("components/Loading", () => {
  const wrapper = shallow(
    <MuiThemeProvider theme={theme}>
      <Loading />
    </MuiThemeProvider>
  )
    .find(Loading)
    .dive();

  afterAll(() => {
    wrapper.unmount();
  });

  it("renders a CircularProgress inside a div", () => {
    expect(wrapper.type() === "div").toBe(true);
    expect(
      wrapper
        .children()
        .at(0)
        .type()
    ).toBe(CircularProgress);
  });
});
