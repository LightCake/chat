import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = props => {
  const { label, type, onClick } = props;
  return (
    <button className="button" type={type} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {};

export default Button;
