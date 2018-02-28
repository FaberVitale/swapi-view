//@flow
import React from "react";
import { Link } from "react-router-dom";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Divider from "material-ui/Divider";

type Props = {
  labels: Array<string>,
  links: Array<string>
};

/* Renders a list of links,
 * the length of the list is Math.min(labels.length, links.length)
 */

const LinkList = ({ labels, links }: Props) => {
  const listItems = [];

  const len = Math.min(labels.length, links.length);
  const maxInd = len - 1;

  for (let i = 0; i < maxInd; i++) {
    listItems.push(
      <ListItem key={labels[i]} containerElement={<Link to={links[i]} />}>
        {labels[i]}
      </ListItem>,
      <Divider key={~i} />
    );
  }

  // we want dividers (<hr>) between items not below.
  if (len > 0) {
    listItems.push(
      <ListItem
        key={labels[maxInd]}
        containerElement={<Link to={links[maxInd]} />}
      >
        {labels[maxInd]}
      </ListItem>
    );
  }

  return <List>{listItems}</List>;
};

export default LinkList;
