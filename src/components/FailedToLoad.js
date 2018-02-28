//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import { paths } from "../routes";
import theme from "../styles/theme";
import Paper from "./Paper";
import RaisedButton from "material-ui/RaisedButton";

const errMessages = {
  timeout: "The request is taking too long, connection timed out.",
  offline: "There's no connection.",
  generic: "Something went wrong..."
};

const getMessage = (error: string) => {
  if (error === "timeout") {
    return errMessages.timeout;
  }

  if (
    window.navigator &&
    window.navigator.onLine === "boolean" &&
    !window.navigator.onLine
  ) {
    return errMessages.offline;
  }

  return errMessages.generic;
};

type Props = {
  error: string,
  retry: () => void
};

/* We redirect if 404 or display an error message */
const FailedToLoad = ({ error, retry }: Props) => {
  if (error === "404") {
    return <Redirect to={paths.fileNotFound} />;
  } else {
    let message = getMessage(error);

    return (
      <Paper element="article" className="failed-to-load-article fade-in">
        <h2 className="failed-to-load-title" style={theme.h2}>
          Ooops!
        </h2>
        <p className="failed-to-load-p" style={theme.p}>
          {message}
        </p>
        <p
          className="failed-to-load-frown"
          aria-hidden="true"
          style={theme.failedToLoad.frown}
        >
          {":("}
        </p>
        <footer className="failed-to-load-footer flex-row">
          <RaisedButton onClick={retry} label="Retry" secondary={true} />
        </footer>
      </Paper>
    );
  }
};

export default FailedToLoad;
