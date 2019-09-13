import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

// Destructuring with renaming
const Auth = ({ component: Component, path, isAuthenticated, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      isAuthenticated ? (
        // Redirect to the chat page if the user is authenticated
        <Redirect to="/chat" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Protected = ({
  component: Component,
  path,
  exact,
  isAuthenticated,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        // Redirect to the login page if the user is not authenticated
        <Redirect to="/login" />
      )
    }
  />
);

// Use the isAuthenticated slice of state to determine whether an user is logged in
const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
