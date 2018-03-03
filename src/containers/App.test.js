import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

describe("containers/App", () => {
  let div = document.createElement("div");

  document.body.appendChild(div);

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it("renders without crashing", done => {
    ReactDOM.render(<App />, div, done);
  });
});
