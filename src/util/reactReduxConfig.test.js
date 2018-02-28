import React from "react";
import { connectView } from "./reactReduxConfig";
import { MemoryRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

describe("util/reactReduxConfig", () => {
  const store = createStore((state = true, action) => true);

  const Comp = props => <p>{JSON.stringify(props)}</p>;
  const Connected = connectView((store, ownProps) => ({
    state: store
  }))(Comp);

  const ConnectedNoMapState = connectView()(Comp);

  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/a/4"]} initialIndex={0}>
          <div>
            <Route exact path="/:e/:id" component={Connected} />
            <Route exact path="/:e/:id" component={ConnectedNoMapState} />
          </div>
        </MemoryRouter>
      </Provider>
    )
    .toJSON();

  it("matches snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
