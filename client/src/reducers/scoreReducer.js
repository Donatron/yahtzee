import {
  SAVE_SCORE,
  GET_SCORES,
  GET_SCORE,
  HIDE_SAVE_BUTTON,
  CLEAR_SCORE,
  SHOW_SAVE_BUTTON
} from "../actions/types";

const initialState = {
  showSaveButton: true,
  scores: [],
  selectedScore: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SCORE:
      return { ...state, scores: [...state.scores, action.payload] };
    case GET_SCORES:
      return {
        ...state,
        allScores: action.payload
      };
    case GET_SCORE:
      return {
        ...state,
        selectedScore: action.payload
      };
    case CLEAR_SCORE:
      return {
        ...state,
        selectedScore: {}
      };
    case HIDE_SAVE_BUTTON:
      return {
        ...state,
        showSaveButton: false
      };
    case SHOW_SAVE_BUTTON:
      return {
        ...state,
        showSaveButton: true
      };
    default:
      return state;
  }
}
