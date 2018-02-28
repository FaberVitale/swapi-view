import React from "react";
import SearchResults from "./SearchResults";
import { mount } from "enzyme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../styles/theme";
import { MemoryRouter } from "react-router-dom";
import LinkList from "./LinkList";
import PaginationWidget from "./PaginationWidget";

describe("components/SearchResults", () => {
  const names = "123456789".split("");
  const links = names.map(str => `/${str}`);

  const baseProps = {
    names,
    links,
    firstPage: links[0],
    id: names[3],
    next: links[4],
    previous: links[2]
  };

  const noResProps = {
    names: [],
    links: [],
    firstPage: "/1",
    id: "1",
    next: null,
    previous: null
  };

  const wrapper = mount(
    <MemoryRouter>
      <MuiThemeProvider muiTheme={theme}>
        <SearchResults {...baseProps} />
      </MuiThemeProvider>
    </MemoryRouter>
  );

  const wrapperNoRes = mount(
    <MemoryRouter>
      <MuiThemeProvider muiTheme={theme}>
        <SearchResults {...noResProps} />
      </MuiThemeProvider>
    </MemoryRouter>
  );

  afterAll(() => {
    wrapper.unmount();
    wrapperNoRes.unmount();
  });

  it("renders LinkList correctly if names.length > 0 are passed", () => {
    const list = wrapper.find(LinkList);
    expect(list).toHaveLength(1);
    expect(list.prop("labels")).toBe(baseProps.names);
    expect(list.prop("links")).toBe(baseProps.links);
  });

  it("renders PaginationWidget correctly", () => {
    const pagination = wrapper.find(PaginationWidget);
    const pagExpProps = Object.assign({}, baseProps);

    delete pagExpProps.names;
    delete pagExpProps.links;

    expect(pagination).toHaveLength(1);

    expect(pagination.props()).toEqual(pagExpProps);
  });

  it("renders SearchResults.noResults if names.length === 0", () => {
    const list = wrapperNoRes.find(LinkList);
    expect(list).toHaveLength(0);
    expect(wrapperNoRes.contains(SearchResults.noResults)).toBe(true);
  });
});
