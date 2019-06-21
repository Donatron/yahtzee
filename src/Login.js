import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="Game">
        <form className="Login-form">
          <h1>Log In</h1>
          <div className="form-group">
            <label htmlFor="email" />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email address"
            />
            <label htmlFor="password" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Log In
          </button>
          <div className="Login-register">
            <Link to="/">
              <span>Not Registered?</span>
            </Link>
          </div>
          <Link to="/">
            <i className="fas fa-arrow-left Login-return">
              <span>Return to Home Page</span>
            </i>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
