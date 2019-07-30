import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser } from "../../actions";

import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {}
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

    const { name, email, password, passwordConfirm } = this.state;

    // Create new user object to pass to backend api
    const newUser = {
      name,
      email,
      password,
      passwordConfirm
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="Game">
        <form className="Register-form" onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <div className="form-group">
            <div className="Register-form-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="enter name"
                onChange={this.handleChange}
                className={errors.name ? "is-invalid" : ""}
              />
              {errors.name ? <small>{errors.name}</small> : ""}
            </div>
            <div className="Register-form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="enter email address"
                onChange={this.handleChange}
                className={errors.email ? "is-invalid" : ""}
              />
              {errors.email ? <small>{errors.email}</small> : ""}
            </div>
            <div className="Register-form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="enter password"
                onChange={this.handleChange}
                className={errors.password ? "is-invalid" : ""}
              />
              {errors.password ? <small>{errors.password}</small> : ""}
            </div>
            <div className="Register-form-input">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="confirm password"
                onChange={this.handleChange}
                className={errors.passwordConfirm ? "is-invalid" : ""}
              />
              {errors.passwordConfirm ? (
                <small>{errors.passwordConfirm}</small>
              ) : (
                ""
              )}
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

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
