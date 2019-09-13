import axios from "axios";

export const setAuthenticationToken = token => {
  // If a token was passed in as an argument to the function
  if (token) {
    // Set the token in the axios header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Othwerwise, delete the token from the axios header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = user => axios.post("/api/users/login", user);

export const register = user => axios.post("/api/users/register", user);
