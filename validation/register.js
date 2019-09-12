const Validator = require("validator");
const validText = require("./valid-text");

const validateRegisterInput = data => {
  const errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = "Password must be between 6 and 32 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validateRegisterInput;
