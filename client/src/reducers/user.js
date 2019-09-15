import { RECEIVE_USERS } from "../actions/users";

const initialState = {
  all: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        all: action.users
      };
    default:
      return state;
  }
};
