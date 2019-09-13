import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = props => {
  const { label, type, onChange, value, onBlur, error } = props;
  return (
    <div className="input_container">
      <span className="input_label">{label}</span>
      <input
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        className="input"
        style={{
          border: error ? "1px solid red" : "",
          marginBottom: error ? "" : ".85rem"
        }}
      />
      <span className="input_error">{error}</span>
    </div>
  );
};

Input.propTypes = {};

export default Input;
