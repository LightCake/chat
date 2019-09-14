import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = props => {
  const { label, type } = props;
  return (
    <button className="button" type={type}>
      {label}
    </button>
  );
};

Button.propTypes = {};

export default Button;
