//@flow
import {
  yellow200 as primary1,
  yellow500 as primary2,
  grey400 as accent3
} from "material-ui/styles/colors";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const boxShadow =
  "0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12)";

const theme = getMuiTheme(darkBaseTheme, {
  palette: {
    primary1Color: primary1,
    primary2Color: primary2,
    accent3Color: accent3,
    accent1Color: primary1,
    alternateTextColor: darkBaseTheme.palette.canvasColor
  },
  topBar: {
    backgroundColor: darkBaseTheme.palette.canvasColor,
    padding: 0,
    margin: 0,
    boxShadow: boxShadow
  },

  paper: {
    boxShadow
  },

  homePaper: {
    backgroundColor: "#000000"
  },

  extLink: {
    color: primary1,
    outlineColor: primary2
  },

  h1: {
    color: primary2,
    fontSize: 24
  },
  h2: {
    color: primary2
  },

  noResults: {
    color: "rgba(255, 255, 255, .5)"
  },

  autocomplete: {
    icon: {
      fill: primary1
    }
  },

  textField: {
    floatingLabelColor: "#fefefe",
    focusColor: primary2,
    borderColor: "#fefefe",
    hintColor: "rgba(255, 255, 255, .5)"
  },

  dropDownMenu: {
    accentColor: "#fefefe",
    focusColor: primary2
  },

  h3: darkBaseTheme.h4,

  p: {
    color: primary2
  },
  failedToLoad: {
    frown: {
      color: primary2,
      opacity: 0.1
    }
  },
  menuItem: {
    selectedTextColor: primary2
  }
});

export default theme;
