import {
  RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS
} from "../actions/session";

const initialState = { session: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return {
        ...state,
        session: Object.assign({}, state.session, action.errors)
      };
    case CLEAR_SESSION_ERRORS:
      return {
        ...state,
        session: {}
      };
    default:
      return state;
  }
};
