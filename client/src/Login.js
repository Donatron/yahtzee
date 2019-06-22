import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`http://localhost:9000/login`);
  }

  render() {
    return (
      <div className="Game">
        <form className="Login-form" onSubmit={this.handleSubmit}>
          <h1>Log In</h1>
          <div className="form-group">
            <div className="Login-form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="enter email address"
                onChange={this.handleChange}
              />
            </div>
            <div className="Login-form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="enter password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Log In
          </button>
          <div className="Login-register">
            <span>Not Registered? </span>
            <Link to="/register">
              <em>Sign up here</em>{" "}
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
