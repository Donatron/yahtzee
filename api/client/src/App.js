import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Footer from "./components/Footer/Footer";
import ScoreCard from "./components/ScoreCard/ScoreCard";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <PrivateRoute path="/profile" exact component={Profile} />
            <Route path="/scorecard/:id" exact component={ScoreCard} />
            <Route path="/leaderboard" exact component={Leaderboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/game" exact component={Game} />
            <Route path="/" exact component={Home} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
