import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// we hide console.warn calls that are in development code
if (window) {
  window.console.warn = () => {};
}
