import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import NavLink from "../NavLink/NavLink";
import { checkLogin } from "../../utils/validation";

const Login = props => {
  const { login, history, receiveErrors, clearErrors, errors } = props;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      clearErrors({});
    };
  }, []);

  const update = fn => event => {
    fn(event.target.value);
  };

  const handleFocus = field => event => {
    const str = event.target.value;
    const errors = checkLogin(field)(str);
    receiveErrors(errors);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const user = { name, password };
    login(user, history);
  };

  return (
    <div className="login">
      <div className="login_left">
        <span className="login_left_title">Try It For Free</span>
        <NavLink to="/register" label="Create Account" />
      </div>
      <div className="login_right">
        <span className="login_title">Welcome Back</span>
        <form onSubmit={handleSubmit} className="login_form">
          <Input
            value={name}
            onChange={update(setName)}
            label="Username"
            type="text"
            onBlur={handleFocus("name")}
            error={errors.name}
          />
          <Input
            value={password}
            onChange={update(setPassword)}
            label="Password"
            type="password"
            onBlur={handleFocus("password")}
            error={errors.password}
          />
          <Button label="Log In" type="submit" />
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
