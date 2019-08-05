import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, createProfile } from "../../actions";

import "./Profile.css";
import Spinner from "../Spinner/Spinner";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      location: "",
      country: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, location, country } = this.state;
    const { createProfile } = this.props;

    const formData = {
      username,
      location,
      country
    };

    createProfile(formData);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { profile } = this.props;

    if (prevProps.profile !== profile) {
      this.setState({
        name: profile.profile.user.name.split(" ")[0],
        username: profile.profile.username,
        location: profile.profile.location,
        country: profile.profile.country
      });
    }
  }

  render() {
    const { profile, alert } = this.props;
    const errors = {};
    const { name, username, location, country } = this.state;

    return profile.loading ? (
      <Spinner />
    ) : (
      <div className="Profile">
        <form className="Profile-form" onSubmit={this.handleSubmit}>
          <h1>{name}'s Profile</h1>
          {alert.msg ? <p>{alert.msg}</p> : ""}
          <div className="form-group">
            <div className="Profile-form-input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="enter username"
                onChange={this.handleChange}
                value={username}
                className={errors.username ? "is-invalid" : ""}
              />
              {errors.username ? <small>{errors.username}</small> : ""}
            </div>
          </div>
          <div className="form-group">
            <div className="Profile-form-input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="enter location"
                onChange={this.handleChange}
                value={location}
                className={errors.location ? "is-invalid" : ""}
              />
              {errors.location ? <small>{errors.location}</small> : ""}
            </div>
          </div>
          <div className="form-group">
            <div className="Profile-form-input">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="enter country"
                onChange={this.handleChange}
                value={country}
                className={errors.country ? "is-invalid" : ""}
              />
              {errors.country ? <small>{errors.country}</small> : ""}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            {profile.name ? "Update Profile" : "Submit Profile"}
          </button>
          <Link to="/">
            <i className="fas fa-arrow-left Profile-return">
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
    auth: state.auth,
    profile: state.profile,
    alert: state.alert
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile }
)(Profile);
