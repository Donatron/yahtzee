import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  CLEAR_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return initialState;
    default:
      return state;
  }
}
