import React from "react";
import { MemoryRouter, withRouter } from "react-router-dom";
import { mount } from "enzyme";
import ScrollOnPathnameChange from "./ScrollOnPathnameChange";

describe("components/ScrollOnPathnameChange", () => {
  let realScrollTo,
    mockScrollTo = jest.fn(() => {});

  let push;

  const GetPush = withRouter(props => {
    if (!push) {
      push = props.history.push;
    }
    return null;
  });

  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <main>
        <GetPush />
        <ScrollOnPathnameChange />
      </main>
    </MemoryRouter>
  );

  beforeAll(() => {
    if (typeof window.scrollTo === "function") {
      realScrollTo = window.scrollTo;
      window.scrollTo = mockScrollTo;
    }
  });

  afterAll(() => {
    if (typeof window.scrollTo === "function") {
      window.scrollTo = realScrollTo;
    }
    wrapper.unmount();
  });

  afterEach(() => {
    mockScrollTo.mockClear();
  });

  it("renders nothing", () => {
    expect(wrapper.find("main").html()).toBe("<main></main>");
  });

  it("scrolls to top on Pathname change", () => {
    push("a/b/c");

    expect(mockScrollTo.mock.calls[0]).toEqual([0, 0]);
  });
});
