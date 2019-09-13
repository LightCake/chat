import { combineReducers } from "redux";
import session from "./session";
import error from "./error";

const root = combineReducers({
  session,
  error
});

export default root;
