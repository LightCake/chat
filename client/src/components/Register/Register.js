import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import { checkRegister } from "../../utils/validation";
import "./Register.css";
import Button from "../Button/Button";

const Register = props => {
  const { register, history, receiveErrors, clearErrors, errors } = props;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
    const errors = checkRegister(field)(str);
    receiveErrors(errors);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const user = { name, password, password2 };
    register(user, history);
  };

  return (
    <div className="register">
      <div className="register_left">
        <span className="register_title">Join Our Community</span>
        <form onSubmit={handleSubmit} className="register_form">
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
          <Input
            value={password2}
            onChange={update(setPassword2)}
            label="Confirm Password"
            type="password"
            onBlur={handleFocus("password2")}
            error={errors.password2}
          />
          <Button type="submit" label="Register" />
        </form>
      </div>
      <div className="register_right"></div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
