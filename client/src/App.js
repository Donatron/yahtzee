import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Game} />
        </Router>
      </div>
    );
  }
}

export default App;
