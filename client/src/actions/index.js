import axios from "axios";

import { REGISTER_USER, LOGIN_USER, GET_ERRORS } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`http://localhost:9000/register`, userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      console.log(err);
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
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.repsonse.data
      });
    });
};
