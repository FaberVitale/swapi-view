import LinkList from "./LinkList";
import { shallow } from "enzyme";
import theme from "../styles/theme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ListItem from "material-ui/List/ListItem";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("components/LinkList", () => {
  const labels = "123456789".split("");
  const links = "1234567".split("").map(str => "/" + str);
  const list = shallow(
    <MemoryRouter initialEntries={["/a"]} initialIndex={0}>
      <MuiThemeProvider muiTheme={theme}>
        <LinkList labels={labels} links={links} />
      </MuiThemeProvider>
    </MemoryRouter>
  )
    .find(LinkList)
    .dive();

  const children = list.children();

  it("renders Math.min(labels.length, links)", () => {
    const expectedLinks = Math.min(labels.length, links.length);
    const expectedDividers = Math.max(0, expectedLinks - 1);

    expect(children.length).toBe(expectedLinks + expectedDividers);
    expect(children.find(ListItem).length).toBe(expectedLinks);
  });
});
