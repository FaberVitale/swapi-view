import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

describe("containers/App", () => {
  it("renders without crashing", () => {
    let div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
