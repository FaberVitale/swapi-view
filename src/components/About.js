//@flow
import React from "react";
import Paper from "./Paper";
import ExtLink from "./ExtLink";
import theme from "../styles/theme";
import ArticleHeader from "./ArticleHeader";

type Props = {||};

class About extends React.Component<Props> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Paper element="article" className="fade-in">
        <ArticleHeader title="About" />
        <section className="about-section">
          <h3 style={theme.h3}>Description</h3>
          <p>
            A <em>(progressive)</em> web app that displays data from{" "}
            <ExtLink href="https://swapi.co/">Swapi</ExtLink>
            {", a Star Wars restful API, created by Github user "}
            <ExtLink href="https://github.com/phalt">Phalt</ExtLink>.
          </p>
        </section>
        <section className="about-section">
          <h3>Author</h3>
          <p>Fabrizio Vitale</p>
        </section>
      </Paper>
    );
  }
}
export default About;
