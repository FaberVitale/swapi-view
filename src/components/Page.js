//@flow
import React, { Component } from "react";
import LinkList from "./LinkList";
import Paper from "./Paper";
import { firstPageOf } from "../routes";
import ArticleHeader from "./ArticleHeader";
import PaginationWidget from "./PaginationWidget";

type Props = {
  route: string,
  endpoint: string,
  id: string,
  next: string | null,
  previous: string | null,
  names: Array<string>,
  links: Array<string>
};

/* Presentational component displays page data */
class Page extends Component<Props> {
  render() {
    return (
      <Paper element="article" className="fade-in">
        <ArticleHeader
          title={this.props.endpoint}
          navigation={
            <PaginationWidget
              firstPage={firstPageOf[this.props.endpoint]}
              next={this.props.next}
              previous={this.props.previous}
              id={this.props.id}
            />
          }
        />
        <LinkList labels={this.props.names} links={this.props.links} />
      </Paper>
    );
  }
}

export default Page;
