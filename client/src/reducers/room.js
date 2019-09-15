import { RECEIVE_ROOMS, UPDATE_USERS } from "../actions/room";

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
    default:
      return state;
  }
};
