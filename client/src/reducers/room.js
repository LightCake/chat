import {
  RECEIVE_ROOMS,
  UPDATE_USERS,
  JOIN_ROOM,
  ADD_ROOM
} from "../actions/room";
import { RECEIVE_USER_LOGOUT } from "../actions/session";

const initialState = {
  all: [],
  current: { id: 2, name: "Lobby" }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ROOMS:
      return {
        ...state,
        all: action.rooms
      };
    case UPDATE_USERS:
      return {
        ...state,
        all: state.all.map(room => {
          if (room.name === action.room.name) {
            room.users = action.room.users;
          }
          return room;
        })
      };
    case JOIN_ROOM:
      return {
        ...state,
        current: action.room
      };
    case ADD_ROOM:
      return {
        ...state,
        all: state.all.concat(action.room)
      };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
