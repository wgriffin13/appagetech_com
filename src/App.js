import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: "#4BC483",
//       main: "#328559",
//       dark: "#245E3F",
//       contrastText: "#ffffff"
//     },
//     secondary: {
//       extraLight: "#d4ffff",
//       light: "#09e4f5",
//       main: "#07A9B5",
//       dark: "#056E75"
//     }
//   },
//   typography: {
//     h1: {
//       fontFamily: "prometo, sans-serif",
//       fontWeight: 700,
//       fontStyle: "italic"
//     },
//     h2: {
//       fontFamily: "prometo, sans-serif",
//       fontWeight: 400
//     },
//     h5: {
//       fontFamily: "prometo, sans-serif",
//       fontWeight: 400
//     },
//     button: {
//       fontFamily: "Roboto Mono, sans-serif",
//       color: "#245E3F",
//       textColor: "#09e4f5",
//       fontStyle: "#328559"
//     },
//     body1: {
//       fontFamily: "Roboto Mono, sans-serif",
//       fontWeight: 400,
//       fontStyle: "normal"
//     }
//   }
// });

class App extends Component {
  render() {
    return (
      // <ThemeProvider theme={theme}>
      //   <CssBaseline />
      <Router>
        <Route
          path="/"
          render={({ location, match, history }) => <Home location={location} match={match} history={history} />}
        />
      </Router>
      // </ThemeProvider>
    );
  }
}

export default App;
