import { REGISTER_USER, LOGIN_USER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
}
