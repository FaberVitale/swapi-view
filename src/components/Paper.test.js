import { shallow } from "enzyme";
import Paper from "./Paper";
import React from "react";

describe("components/Paper", () => {
  const wrapper = shallow(<Paper />);

  it("renders an empty div with className paper if no prop is provided", () => {
    expect(wrapper.is("div")).toBe(true);
    expect(wrapper.children()).toHaveLength(0);
  });

  it("renders the request element", () => {
    const nextWrapper = wrapper.setProps({ element: "main" });
    expect(nextWrapper.is("main")).toBe(true);
    expect(nextWrapper.children()).toHaveLength(0);
  });

  it("joins className", () => {
    const nextWrapper = wrapper.setProps({ className: "fancy" });

    expect(nextWrapper.prop("className")).toBe("fancy paper");
  });

  it("uses .assign(defStyle, style) for style prop", () => {
    const nextWrapper = wrapper.setProps({ style: { opacity: 0 } });

    expect(nextWrapper.prop("style").opacity).toBe(0);
  });

  it("renders children correctly", () => {
    const a = <span key="0">a</span>;
    const b = <p key="1">b</p>;
    const nextWrapper = wrapper.setProps({
      children: [a, b]
    });

    const children = nextWrapper.children();

    expect(children).toHaveLength(2);
    expect(children.at(0).matchesElement(a)).toBe(true);
    expect(children.at(1).matchesElement(b)).toBe(true);
  });
});
