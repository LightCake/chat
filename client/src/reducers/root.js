import { combineReducers } from "redux";
import session from "./session";
import error from "./error";
import room from "./room";

const root = combineReducers({
  session,
  room,
  error
});

export default root;
