import { REGISTER_USER, SET_CURRENT_USER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}
