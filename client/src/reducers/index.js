import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import alertReducer from "./alertReducer";
import scoreReducer from "./scoreReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  alert: alertReducer,
  score: scoreReducer
});
