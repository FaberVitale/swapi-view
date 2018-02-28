import { hoc } from "./SearchPageContainer";
import React from "react";
import { shallow } from "enzyme";

describe("containers/SearchPageContainer", () => {
  const BaseComp = props => <p>{JSON.stringify(props)}</p>;

  const Comp = hoc(BaseComp);

  const invQuery = {
    match: {
      params: {
        endpoint: "people"
      }
    },
    location: {
      search: "?q=a&page=re", // invalid query
      pathname: "/people/search"
    }
  };

  const validQuery = Object.assign({}, invQuery, {
    location: { search: "?q=as&page=1", pathname: invQuery.location.pathname }
  });

  const wrapper = shallow(<Comp {...invQuery} />);

  afterAll(wrapper.unmount.bind(wrapper));

  it("passes down the correct props if an inv query is passed", () => {
    expect(wrapper.find(BaseComp).props()).toEqual({
      endpoint: "people",
      q: null,
      page: null
    });
  });

  it("passes down the correct props if a valid query is passed", () => {
    expect(
      wrapper
        .setProps(validQuery)
        .find(BaseComp)
        .props()
    ).toEqual({
      endpoint: "people",
      q: "as",
      page: "1"
    });
  });
});
