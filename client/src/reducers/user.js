import { RECEIVE_USERS, RECEIVE_USER, REMOVE_USER } from "../actions/users";
import { RECEIVE_USER_LOGOUT } from "../actions/session";

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
    case REMOVE_USER:
      return {
        ...state,
        all: state.all.filter(client => client.user !== action.user.name)
      };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
