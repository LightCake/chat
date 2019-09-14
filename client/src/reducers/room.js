import { RECEIVE_ROOMS } from "../actions/room";

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
    default:
      return state;
  }
};
