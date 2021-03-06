import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";

import Root from "./components/Root/Root";
import configureStore from "./store/store";
import { setAuthenticationToken } from "./utils/session";
import { logout } from "./actions/session";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthenticationToken(localStorage.jwtToken);
    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);
    // Create a preconfigured state we can immediately add to our store
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser }
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }
  // Render our root component and pass in the store as prop
  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
