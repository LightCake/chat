import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = props => {
  const { label } = props;
  return <button className="button">{label}</button>;
};

Button.propTypes = {};

export default Button;
