import { mount } from "enzyme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../styles/theme";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./SearchPage";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import SearchWidgetContainer from "../containers/SearchWidgetContainer";
import SearchResultsContainer from "../containers/SearchResultsContainer";

describe("components/SearchPage", () => {
  const store = configureStore();

  const props = {
    endpoint: "people",
    q: "run",
    page: "1"
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <MuiThemeProvider muiTheme={theme}>
          <SearchPage {...props} />
        </MuiThemeProvider>
      </MemoryRouter>
    </Provider>
  );

  const topNode = wrapper.find("article");

  const searchWidget = topNode.find(SearchWidgetContainer);

  const searchResults = topNode.find(SearchResultsContainer);

  afterAll(wrapper.unmount.bind(wrapper));

  it("renders an article", () => {
    expect(topNode.type()).toBe("article");
  });

  it("renders inside the  article a header, SearchWidgetContainer and SearchResultsContainer", () => {
    expect(topNode.find("header")).toHaveLength(1);
    expect(searchWidget).toHaveLength(1);
    expect(searchResults).toHaveLength(1);
  });

  it("passes down the correct props to its child components", () => {
    expect(searchResults.props()).toEqual(props);
    expect(searchWidget.props()).toEqual({
      selected: props.endpoint,
      page: props.page,
      text: props.q
    });
  });
});
