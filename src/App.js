import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/"
          render={({ location, match, history }) => <Home location={location} match={match} history={history} />}
        />
      </Router>
    );
  }
}

export default App;
