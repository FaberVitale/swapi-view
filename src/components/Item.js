//@flow
import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import Paper from "./Paper";
import ArticleHeader from "./ArticleHeader";
import NavItemWidget from "./NavItemWidget";
import theme from "../styles/theme";
type Props = {
  item: ItemData,
  route: string,
  name: string,
  editedKey: string
};

/* Component that visualizes normal items and their wookiee translation */
class Item extends Component<Props> {
  _makeListItem = (key: string) => {
    return (
      <ListItem key={key} tabIndex={-1}>
        <section className="item-row flex-row justify-space-between">
          <h3 style={theme.h3} className="item-row-elem">
            <strong>{key.replace(/_/g, " ")}</strong>
          </h3>
          <span className="item-row-elem">{this.props.item.data[key]}</span>
        </section>
      </ListItem>
    );
  };

  render() {
    return (
      <Paper element="article" className="item-article slide-up-fade-in">
        <ArticleHeader
          title={this.props.name}
          navigation={<NavItemWidget route={this.props.route} />}
        />
        <List>{Object.keys(this.props.item.data).map(this._makeListItem)}</List>
        <footer className="item-footer flex-row justify-flex-end">
          <span>
            {`${this.props.editedKey}: `}
            <time dateTime={this.props.item.meta[this.props.editedKey]}>
              {new Date(
                this.props.item.meta[this.props.editedKey]
              ).toLocaleString()}
            </time>
          </span>
        </footer>
      </Paper>
    );
  }
}

export default Item;
