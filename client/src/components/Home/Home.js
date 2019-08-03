import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions";

import "./Home.css";
import HomeHeader from "./HomeHeader";

class Home extends Component {
  constructor(props) {
    super(props);

    this.renderButtons = this.renderButtons.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    // Remove JWT
    localStorage.removeItem("jwtToken");

    // Clear logged in user from state.auth
    this.props.logoutUser();
  }

  renderButtons() {
    const { auth } = this.props;

    if (auth.isAuthenticated) {
      return (
        <div className="Game-welcome-button-wrapper">
          <Link to="/game">Play Game</Link>
          <Link to="/profile">View / Manage Profile</Link>
          <Link to="/" onClick={this.logoutUser}>
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <div className="Game-welcome-button-wrapper">
          <Link to="/game">Play as a guest</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
          <Link to="/leaderboard">View Leaderboard</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Home Game-welcome">
        <HomeHeader auth={this.props.auth} />
        {this.renderButtons()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);
