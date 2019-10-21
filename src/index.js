import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4BC483",
      main: "#328559",
      dark: "#245E3F",
      contrastText: "#ffffff"
    },
    secondary: {
      extraLight: "#d4ffff",
      light: "#09e4f5",
      main: "#07A9B5",
      dark: "#056E75"
    }
  },
  typography: {
    h1: {
      fontFamily: "prometo, sans-serif",
      fontWeight: 700,
      fontStyle: "italic"
    },
    h2: {
      fontFamily: "prometo, sans-serif",
      fontWeight: 400
    },
    h5: {
      fontFamily: "prometo, sans-serif",
      fontWeight: 400
    },
    button: {
      fontFamily: "Roboto Mono, sans-serif",
      color: "#245E3F",
      textColor: "#09e4f5",
      fontStyle: "#328559"
    },
    body1: {
      fontFamily: "Roboto Mono, sans-serif",
      fontWeight: 400,
      fontStyle: "normal"
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
