import { combineReducers } from "redux";
import session from "./session";
import error from "./error";
import room from "./room";
import message from "./message";

const root = combineReducers({
  session,
  room,
  message,
  error
});

export default root;
