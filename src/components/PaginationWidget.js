//@flow
import React from "react";
import NavigationLink from "./NavigationLink";
import Chip from "./Chip";
import ChevronRight from "material-ui/svg-icons/navigation/chevron-right";
import ChevronLeft from "material-ui/svg-icons/navigation/chevron-left";
import FirstPage from "material-ui/svg-icons/navigation/first-page";

type Props = {
  next: string | null,
  previous: string | null,
  id: string,
  firstPage: string | null
};

class PaginationWidget extends React.PureComponent<Props> {
  static labels = {
    firstPage: "first page",
    previous: "previous page",
    next: "next page"
  };
  render() {
    const { next, previous, id, firstPage } = this.props;

    return [
      <NavigationLink
        aria-label={PaginationWidget.labels.firstPage}
        key={0}
        icon={<FirstPage />}
        disabled={previous === null}
        to={firstPage || "#"}
      />,
      <NavigationLink
        aria-label={PaginationWidget.labels.previous}
        key={1}
        icon={<ChevronLeft />}
        disabled={previous === null}
        to={previous || "#"}
      />,
      <Chip key={2} text={`page ${id}`} />,
      <NavigationLink
        aria-label={PaginationWidget.labels.next}
        key={3}
        icon={<ChevronRight />}
        disabled={next === null}
        to={next || "#"}
      />
    ];
  }
}

export default PaginationWidget;
