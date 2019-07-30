import { SAVE_SCORE, HIDE_SAVE_BUTTON } from "../actions/types";

const initialState = {
  showSaveButton: true,
  scores: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SCORE:
      return { ...state, scores: [...state.scores, action.payload] };
    case HIDE_SAVE_BUTTON:
      return {
        ...state,
        showSaveButton: false
      };
    default:
      return state;
  }
}
