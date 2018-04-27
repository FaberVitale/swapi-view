//@flow
import React from "react";
import ReactDOM from "react-dom";
import "./styles/roboto-typeface.css";
import "./styles/index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

const root = document.getElementById("root");

if (root !== null) {
  if (root.hasChildNodes()) {
    ReactDOM.hydrate(<App />, root);
  } else {
    ReactDOM.render(<App />, root);
  }
  registerServiceWorker();
} else {
  console.warn("root doesnt exist");
}
