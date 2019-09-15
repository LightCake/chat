import { combineReducers } from "redux";
import session from "./session";
import error from "./error";
import room from "./room";
import message from "./message";
import user from "./user";

const root = combineReducers({
  session,
  room,
  message,
  user,
  error
});

export default root;
