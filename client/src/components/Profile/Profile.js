import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions";

import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    console.log(this.state);
    const { auth, profile } = this.props;
    const name = "Don Macarthur";
    const errors = {};

    return (
      <div className="Profile">
        <form className="Profile-form" onSubmit={this.handleSubmit}>
          <h1>{name ? `${name}'s Profile` : "Enter Profile Information"}</h1>
          <div className="form-group">
            <div className="Profile-form-input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="enter username"
                onChange={this.handleChange}
                value={
                  profile.profile
                    ? profile.profile.username
                    : this.state.username
                }
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
                value={
                  profile.profile
                    ? profile.profile.location
                    : this.state.location
                }
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
                value={
                  profile.profile ? profile.profile.country : this.state.country
                }
                className={errors.country ? "is-invalid" : ""}
              />
              {errors.country ? <small>{errors.country}</small> : ""}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            {name ? "Update Profile" : "Submit Profile"}
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
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
