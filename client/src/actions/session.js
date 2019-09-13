import jwt_decode from "jwt-decode";
import * as API from "../utils/session";

// Action Types
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

// Action Creators
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const login = (user, history) => dispatch => {
  API.login(user)
    .then(response => {
      // Destructure token from the response
      const { token } = response.data;
      // Save token to the local storage
      localStorage.setItem("jwtToken", token);
      // Set the token in the common axios header
      API.setAuthenticationToken(token);
      // Decode token to get the user's information
      const decoded_token = jwt_decode(token);
      // Save the user in the redux store state
      dispatch(receiveCurrentUser(decoded_token));
      // After a successful login push the user to the chat page
      history.push("/chat");
    })
    .catch(err => {
      // If any error occured in the login process, then save it in the redux store state
      dispatch(receiveErrors(err.response.data));
    });
};

export const logout = () => dispatch => {
  // Remove the token from the local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  API.setAuthenticationToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};

export const register = (user, history) => dispatch => {
  API.register(user)
    .then(() => history.push("/login"))
    .catch(err => dispatch(receiveErrors(err.response.data)));
};
