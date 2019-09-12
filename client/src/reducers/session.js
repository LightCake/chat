import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "../actions/session";

const initialState = {
  user: {},
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        user: action.user,
        isAuthenticated: true
      };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
