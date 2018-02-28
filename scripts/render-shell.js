//This script renders the app shell and defers css download

// these assignments must be on top of the script
// babel,react and components in ./src have to produce production code
process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

require("babel-register")({
  ignore: /\/(build|node_modules)\//,
  presets: ["env", "react-app"]
});

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const buildFolder = path.resolve(__dirname, "../build");

const APP_FILE = "../src/containers/App";
const HTML_FILE = path.resolve(buildFolder, "./index.html");

const htmlPath = path.resolve(__dirname, HTML_FILE);

const logProgress = (message = "") => {
  console.log(chalk.green(message + "\n"));
};

const error = (message = "", err) => {
  console.log(chalk.red(message + "\n"));
  if (err) {
    throw err;
  }
};

// we check that there's only one #root element that has no children
const validateRoot = $Root => {
  let msg;

  if ($Root.length === 0) {
    msg = "root element not present";
    error(msg, new Error(msg));
  } else if ($Root.length > 1) {
    msg = "too many root elements found";
    error(msg, new Error(msg));
  }

  if ($Root.children().length > 0) {
    msg = "root should not have children";
    error(msg, new Error(msg));
  }
};

const ReactDOM = require("react-dom/server");
const React = require("react");
const jsdom = require("jsdom");
const cheerio = require("cheerio");

(async function renderShell() {
  let htmlBase, htmlRes, appToString;

  logProgress("reading html file");

  try {
    htmlBase = String(await fs.readFile(htmlPath));
  } catch (e) {
    error(`error while reading html file ${HTML_FILE}`, e);
  }

  global.window = jsdom.jsdom().defaultView;
  global.document = window.document;

  logProgress("rendering");
  try {
    appToString = ReactDOM.renderToString(
      React.createElement(require(APP_FILE).default)
    );
  } catch (e) {
    error(`error while rendering App ${APP_FILE}`, e);
  }

  delete global.window;
  delete global.document;

  const $ = cheerio.load(htmlBase);
  htmlBase = null;

  const $Root = $("#root");

  const cssSelector = 'head > link[rel="stylesheet"]';

  const cssLink = $(cssSelector);
  const cssPath = cssLink.attr("href");

  cssLink.remove();

  validateRoot($Root);

  $Root.append(appToString);
  appToString = null;

  htmlRes = $.html();

  htmlRes = htmlRes.replace(/__CSS__/g, cssPath);

  logProgress("saving to disk");
  try {
    fs.writeFile(htmlPath, htmlRes);
  } catch (e) {
    error(`failed to write html file at ${HTML_FILE}`, e);
  }
})().then(logProgress.bind(null, "done"), err => {
  console.error(err);
  process.exitCode = 1;
});
