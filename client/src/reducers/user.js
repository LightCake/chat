import { RECEIVE_USERS, RECEIVE_USER } from "../actions/users";

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
    case RECEIVE_USER:
      return {
        ...state,
        all: state.all.concat(action.user)
      };
    default:
      return state;
  }
};
