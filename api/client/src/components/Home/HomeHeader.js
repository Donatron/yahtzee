import React, { Component } from "react";

class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { auth } = this.props;

    if (auth.isAuthenticated) {
      return (
        <div className="">
          <h2 className="Game-welcome-title">Thanks for stopping by!</h2>
          <p>What would you like to do?</p>
        </div>
      );
    } else {
      return (
        <div className="">
          <h2 className="Game-welcome-title">
            Your one-stop, online Yahtzee app
          </h2>
          <p>
            Either play as a guest, or create account and log in to save your
            scores and compete against your friends.
          </p>
        </div>
      );
    }
  }

  render() {
    return <div className="HomeHeader">{this.renderHeader()}</div>;
  }
}

export default HomeHeader;
