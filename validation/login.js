const Validator = require("validator");
const validText = require("./valid-text");

const validateLoginInput = data => {
  const errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validateLoginInput;
