import React from "react";
import { mount } from "enzyme";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PaginationWidget from "./PaginationWidget";
import { MemoryRouter, withRouter } from "react-router-dom";
import NavigationLink from "./NavigationLink";

describe("components/PaginationWidget", () => {
  const props = {
    next: "/5",
    previous: "/3",
    id: "4",
    firstPage: "/1"
  };

  const linkOrder = [props.firstPage, props.previous, props.next];

  const Comp = withRouter(PaginationWidget);
  const initialPath = "/a";
  const wrapper = mount(
    <MemoryRouter initialEntries={[initialPath]} initialIndex={0}>
      <MuiThemeProvider theme={theme}>
        <Comp {...props} />
      </MuiThemeProvider>
    </MemoryRouter>
  );
  afterAll(wrapper.unmount.bind(wrapper));
  const widget = wrapper.find(PaginationWidget);
  const links = widget.find(NavigationLink);

  it("renders 3 NavigationLinks in the correct order", () => {
    expect(links).toHaveLength(3);

    expect(links.map(node => node.prop("to"))).toEqual(linkOrder);
  });
});
