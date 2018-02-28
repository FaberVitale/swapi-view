//@flow
import * as React from "react";
import theme from "../styles/theme";

type Props = {
  title: string,
  navigation?: React.Element<*>
};

/* Header that renders on the bottom-left the title of the article
 * and on the top-right a navigation widget passed as prop
 * 
 * we use PureComponent to prevent a re-render if title is the same 
 * and navigation is undefined 
*/
class ArticleHeader extends React.PureComponent<Props> {
  render() {
    return (
      <header className="article-header justify-space-between flex-column align-items-center">
        <div
          aria-hidden={!this.props.navigation}
          className="article-header-group flex-row justify-flex-end header-nav"
        >
          {this.props.navigation}
        </div>
        <div className="article-header-group justify-flex-start">
          <h2 className="article-header-title" style={theme.h2}>
            {this.props.title}
          </h2>
        </div>
      </header>
    );
  }
}

export default ArticleHeader;
