import * as API from "../utils/session";

// Action Types
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

// Action Creators
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const login = user => dispatch => {
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
    })
    .catch(err => {
      // If any error occured in the login process, then save it in the redux store state
      dispatch(receiveErrors(err.response.data));
    });
};
