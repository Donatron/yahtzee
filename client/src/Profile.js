import React, { Component } from "react";
import { connect } from "react-redux";

import "./Profile.css";

class Profile extends Component {
  render() {
    const { auth } = this.props;
    const { name } = auth;

    return (
      <div className="Profile">
        <h1>Welcome back {name.split(" ")[0]}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Profile);
