import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import {
  REGISTER_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

export const registerUser = (userData, history) => dispatch => {
  // Clear existing errors;
  dispatch(clearErrors());

  axios
    .post(`http://localhost:9000/register`, userData)
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
    .post("http://localhost:9000/login", user)
    .then(res => {
      // Save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

      history.push("./profile");

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

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  };
};
