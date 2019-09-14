import { RECEIVE_MESSAGE, RECEIVE_MESSAGES } from "../actions/message";

const initialState = {
  room: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return {
        ...state,
        room: action.messages
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        room: state.room.concat(action.message)
      };
    default:
      return state;
  }
};
