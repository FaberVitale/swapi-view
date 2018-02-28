//@flow
import React from "react";
import SelectField from "material-ui/SelectField";
import AutoComplete from "material-ui/AutoComplete";
import { endpoints, queryRegex } from "../routes";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import Search from "material-ui/svg-icons/action/search";
import { mapQueryToName } from "../util/query";
import _throttle from "lodash.throttle";
import theme from "../styles/theme";
/*State
 *  error: boolean that indicates an invalid input/query
 *  index: index => endpoint[this.state.index] = choice
 *  input: value of the Autocomplete  text field
 *  menuProps: props passed to Popover's menu, used to control the height of the popover on resize
 */
type State = {
  error: boolean,
  index: number,
  input: string,
  menuProps: { maxHeight: number }
};

/*Props 
 *  dataSources: an object that maps endpoints to an array of suggestions and 
 *    suggestions to the route of that item
 *  push: react-router's history.push
 *  selected: the :endpoint in the url
 *  error: true if the query is invalid      
 */
type Props = {
  dataSources: {
    [endpoint: string]: {
      suggestions: Array<string>,
      suggestionToKey: { [sugg: string]: string }
    }
  },
  push: (route: string) => void,
  text: string,
  page: string,
  selected: string
};

const errorText = "invalid input";

const getMenuPropsHeight = (winHeight: number = 450) => ({
  maxHeight: Math.max(Math.floor(window.innerHeight / 3 || 0), 150)
});

// see: https://github.com/mui-org/material-ui/issues/7015
const menuPropsBase = {
  style: {
    overflowX: "hidden"
  },
  maxHeight: 150
};

class SearchWidget extends React.Component<Props, State> {
  static resultLength = 10; // number of search results, it affects performance if too big

  _caretButton: HTMLElement;

  constructor(props: Props) {
    super(props);
    const { selected, text } = props;

    const index = endpoints.indexOf(selected);

    this.state = {
      error: false,
      index: index > -1 ? index : 0,
      input: text,
      menuProps: Object.assign(
        {},
        menuPropsBase,
        getMenuPropsHeight(window.innerHeight)
      )
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizePopover, { passive: true });
    // an alternative to the union type HTMLElement | null that causes a lot less hassle
    let maybeNull = document.querySelector(
      '#search-select button[type="button"]'
    );

    if (maybeNull !== null) {
      this._caretButton = maybeNull;
      this._caretButton.addEventListener("focus", this.handleIconFocus);
      this._caretButton.addEventListener("blur", this.handleIconBlur);

      //a11y fix: the caret desnt have a label or text
      this._caretButton.setAttribute("aria-label", "open menu");
    }
  }

  //we update the state if at least a prop is changed and fits the requirements
  componentWillReceiveProps({ text, selected }: Props) {
    let nextIndex = endpoints.indexOf(selected);

    let invInput = text && this.state.input !== text;
    let invIndex = nextIndex > -1 && nextIndex !== this.state.index;

    if (invInput || invIndex) {
      this.setState({
        input: invInput ? text : this.state.input,
        index: invIndex ? nextIndex : this.state.index
      });
    }
  }

  //clean up
  componentWillUnmount() {
    if (this._caretButton) {
      this._caretButton.removeEventListener("focus", this.handleIconFocus);
      this._caretButton.removeEventListener("blur", this.handleIconFocus);
    }

    window.removeEventListener("resize", this.resizePopover, { passive: true });
  }

  handleIconFocus({ target }: FocusEvent) {
    if (target instanceof HTMLElement) {
      target.style.setProperty("fill", theme.dropDownMenu.focusColor);
    }
  }

  handleIconBlur({ target }: FocusEvent) {
    if (target instanceof HTMLElement) {
      target.style.setProperty("fill", theme.dropDownMenu.accentColor);
    }
  }

  handleSubmit = (evt: Event) => {
    evt.preventDefault();
  };

  resizePopover = _throttle((evt: UIEvent) => {
    this.setState({
      menuProps: Object.assign(
        {},
        menuPropsBase,
        getMenuPropsHeight(window.innerHeight)
      )
    });
  }, 300);

  handleSelectChange = (event: MouseEvent, key: number, payload: any) => {
    this.setState({
      index: key,
      input: ""
    });
  };

  handleUpdateInput = (inputText: string) => {
    this.setState((prevState: State) => {
      const nextState = {};

      nextState.input = inputText;

      if (prevState.error) {
        nextState.error = false;
      }

      return nextState;
    });
  };

  _makeMenuItem = (endpoint: string, index: number) => (
    <MenuItem key={endpoint} value={index} primaryText={endpoint} />
  );

  handleNewRequest = (_: string, index: number) => {
    let trimmed = this.state.input.trim();
    const selected = endpoints[this.state.index];

    //push only valid queries
    if (queryRegex.q.test(trimmed)) {
      const url = mapQueryToName(selected, {
        q: trimmed,
        page: "1"
      });

      // we dont push a new entry in the history stack
      // if the query, endpoint and the page are the same
      if (
        trimmed === this.props.text &&
        selected === this.props.selected &&
        this.props.page === "1"
      ) {
        return;
      }

      //check if this item is present already, if yes serve it instead of
      //asking to the server
      const maybeId = this.props.dataSources[selected].suggestionToKey[trimmed];
      if (typeof maybeId === "string") {
        this.props.push(maybeId);
      } else {
        this.props.push(url);
      }
    } else {
      // notify the user that has input an invalid string
      this.setState({
        error: true,
        input: ""
      });
    }
  };

  handleButtonClick = (evt: MouseEvent) => {
    // handles only left/primary buttons clicks
    if (evt.button) {
      return;
    }

    this.handleNewRequest(this.state.input, -1);
  };

  render() {
    return (
      <form
        className="flex-row-wrap justify-space-between"
        onSubmit={this.handleSubmit}
      >
        <SelectField
          className="select-field"
          value={this.state.index}
          onChange={this.handleSelectChange}
          floatingLabelText="topic"
          hintText="select a topic"
          id="search-select"
          floatingLabelFixed={true}
        >
          {endpoints.map(this._makeMenuItem)}
        </SelectField>
        <div className="autocomplete-container flex-row">
          <AutoComplete
            className="autocomplete"
            dataSource={
              this.props.dataSources[endpoints[this.state.index]].suggestions
            }
            filter={AutoComplete.caseInsensitiveFilter}
            floatingLabelText="search"
            hintText="which one?"
            maxSearchResults={SearchWidget.resultLength}
            searchText={this.state.input}
            menuProps={this.state.menuProps}
            onNewRequest={this.handleNewRequest}
            spellCheck="false"
            onUpdateInput={this.handleUpdateInput}
            errorText={this.state.error ? errorText : null}
          />
          <IconButton
            aria-label="search"
            className="autocomplete-button"
            onClick={this.handleButtonClick}
          >
            <Search />
          </IconButton>
        </div>
      </form>
    );
  }
}

export default SearchWidget;
