import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import uuid from "uuid";

import {
  SET_ALERT,
  REMOVE_ALERT,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_USER,
  CREATE_PROFILE,
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  GET_ERRORS,
  SAVE_SCORE,
  GET_SCORES,
  GET_SCORE,
  CLEAR_SCORE,
  HIDE_SAVE_BUTTON,
  SHOW_SAVE_BUTTON
} from "./types";

export const setAlert = (msg, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      id
    }
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};

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
      // const decoded = jwt_decode(token);

      dispatch(setCurrentUser());

      history.push("./");

      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });

      dispatch(getCurrentProfile());

      dispatch(clearErrors());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });

  dispatch({
    type: CLEAR_PROFILE
  });
};

export const setCurrentUser = () => async dispatch => {
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
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const response = await axios.post("/profile", formData);

    dispatch({
      type: CREATE_PROFILE,
      payload: response.data
    });

    dispatch(getCurrentProfile());

    dispatch(setAlert("Your profile has been updated!"));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const saveScore = scoreData => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  try {
    const response = await axios.post("/score", scoreData);

    dispatch({
      type: SAVE_SCORE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }

  dispatch(hideSaveButton());
};

export const hideSaveButton = () => dispatch => {
  dispatch({
    type: HIDE_SAVE_BUTTON
  });
};

export const showSaveButton = () => dispatch => {
  dispatch({
    type: SHOW_SAVE_BUTTON
  });
};

export const getScores = () => async dispatch => {
  try {
    const response = await axios.get("/score");

    dispatch({
      type: GET_SCORES,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getScore = id => async dispatch => {
  try {
    const response = await axios.get(`/score/${id}`);

    dispatch({
      type: GET_SCORE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.resposne.data
    });
  }
};

export const clearScore = () => dispatch => {
  dispatch({
    type: CLEAR_SCORE
  });
};

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};
