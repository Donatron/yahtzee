import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      username: ""
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

    console.log(this.state);
  }

  render() {
    return (
      <div className="Game">
        <form className="Register-form" onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <div className="form-group">
            <div className="Register-form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="enter email address"
                onChange={this.handleChange}
              />
            </div>
            <div className="Register-form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="enter password"
                onChange={this.handleChange}
              />
            </div>
            <div className="Register-form-input">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="confirm password"
                onChange={this.handleChange}
              />
            </div>
            <div className="Register-form-input">
              <label htmlFor="username">Username</label>
              <input
                type="password"
                name="username"
                id="username"
                placeholder="enter username"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Register
          </button>
          <div className="Register-register">
            <span>Already Registered? </span>
            <Link to="/login">
              <em>Log in here</em>{" "}
            </Link>
          </div>
          <Link to="/">
            <i className="fas fa-arrow-left Register-return">
              <span>Return to Home Page</span>
            </i>
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
