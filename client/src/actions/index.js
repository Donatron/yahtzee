import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_USER,
  CREATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_ERRORS
} from "./types";

export const registerUser = (userData, history) => dispatch => {
  // Clear existing errors;
  dispatch(clearErrors());

  axios
    .post(`/register`, userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      // Clear existing errors
      dispatch(clearErrors());

      // Set new errors
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user, history) => dispatch => {
  axios
    .post("login", user)
    .then(res => {
      // Save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

      history.push("./");

      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });

      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const setCurrentUser = decoded => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const response = await axios.get("/user");

    dispatch({
      type: SET_CURRENT_USER,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getCurrentProfile = () => async dispatch => {
  try {
    const request = await axios.get("/profile");

    dispatch({
      type: GET_PROFILE,
      payload: request.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  };
};

export const createProfile = formData => async dispatch => {
  console.log(formData);
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const response = await axios.post(
      "http://localhost:9000/profile",
      formData
    );

    dispatch({
      type: CREATE_PROFILE,
      payload: response.data
    });

    dispatch(getCurrentProfile());
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
