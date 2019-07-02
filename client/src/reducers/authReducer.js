import { REGISTER_USER, SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
