import React from "react";
import withLoader from "./withLoader";
import { MemoryRouter, Route } from "react-router-dom";
import { shallow, mount } from "enzyme";

describe("containers/withRouter", () => {
  const Comp = ({ data }) => <p>{JSON.stringify(data)}</p>;
  const load = jest.fn(() => {});

  let push;
  let wrapper;

  const GetPush = props => {
    push = props.history.push;
    return null;
  };
  const NoOpt = withLoader()(Comp);

  const renderNoOptFunc = rest => ({ match, location, history }) => [
    <GetPush key={0} history={history} />,
    <NoOpt key={1} {...rest} match={match} search={location.search} />
  ];

  const TestNoOptComp = ({ children, ...rest }) => (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Route exact path="*" render={renderNoOptFunc(rest)} />
    </MemoryRouter>
  );

  const baseProps = {
    match: { url: "/" },
    search: ""
  };

  const loadingProps = {
    data: null,
    error: null,
    load
  };

  const errorProps = {
    data: null,
    error: "err",
    load
  };

  const dataProps = {
    data: { a: 2, b: 3 },
    error: null,
    load
  };

  afterEach(() => {
    load.mockClear();
    wrapper.unmount();
  });

  it("default opt, match the snapshots", () => {
    wrapper = shallow(<TestNoOptComp {...loadingProps} />);

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.setProps(errorProps).html()).toMatchSnapshot();
    expect(wrapper.setProps(dataProps).html()).toMatchSnapshot();
  });

  it("calls load if error == null && data == null on DidMount hook", () => {
    wrapper = mount(<TestNoOptComp {...loadingProps} />);
    expect(load.mock.calls).toHaveLength(1);
  });

  it("on match.url or search change if loading, calls load again", () => {
    wrapper = mount(<TestNoOptComp {...loadingProps} />);

    expect(load.mock.calls).toHaveLength(1);

    push("/a");

    expect(load.mock.calls).toHaveLength(2);

    push("/a?q=a");

    expect(load.mock.calls).toHaveLength(3);
  });

  it("if error != null, it passes down load as retry", () => {
    wrapper = mount(<TestNoOptComp {...errorProps} />);

    expect(
      wrapper
        .find("p")
        .parent()
        .prop("retry")
    ).toBe(load);
  });

  it("uses mapProps if defined and  data != null && error == null", () => {
    let mapProps = jest.fn(props => ({ data: 3 }));

    const MapProps = withLoader({
      mapProps
    })(Comp);

    const TestMapPropsComp = ({ children, ...rest }) => (
      <MapProps {...baseProps} {...rest} />
    );

    wrapper = mount(<TestMapPropsComp {...loadingProps} />);

    expect(mapProps.mock.calls).toHaveLength(0);

    wrapper.setProps(errorProps);

    expect(mapProps.mock.calls).toHaveLength(0);

    wrapper.setProps(dataProps);

    expect(mapProps.mock.calls).toHaveLength(1);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("uses ErrorComponent and LoadingComponent, if defined", () => {
    const errorMsg = "error";
    const loadingMsg = "loading...";

    const OptComp = withLoader({
      ErrorComponent: () => <p>{errorMsg}</p>,
      LoadingComponent: () => <p>{loadingMsg}</p>
    })(Comp);

    wrapper = mount(<OptComp {...baseProps} {...loadingProps} />);

    expect(wrapper.find("p").text()).toBe(loadingMsg);

    wrapper.setProps(Object.assign({}, baseProps, errorProps));

    expect(wrapper.find("p").text()).toBe(errorMsg);

    wrapper.setProps(Object.assign({}, baseProps, dataProps));

    const dataText = wrapper.find("p").text();

    expect(dataText).not.toBe(errorMsg);
    expect(dataText).not.toBe(loadingMsg);
  });
});
