import Validator from "validator";

export const checkRegister = field => str => {
  const errors = {};

  if (field === "name") {
    errors.name = "";
    if (!Validator.isLength(str, { min: 2, max: 20 })) {
      errors.name = "Name must be between 2 and 20 characters";
    }
    if (Validator.isEmpty(str)) {
      errors.name = "Name field is required";
    }
  }

  if (field === "password") {
    errors.password = "";
    if (!Validator.isLength(str, { min: 6, max: 32 })) {
      errors.password = "Password must be between 6 and 32 characters";
    }

    if (Validator.isEmpty(str)) {
      errors.password = "Password field is required";
    }
  }

  if (field === "password2") {
    errors.password2 = "";
    if (Validator.isEmpty(str)) {
      errors.password2 = "Confirm Password field is required";
    }
  }

  return errors;
};

export const checkLogin = field => str => {
  const errors = {};

  if (field === "name") {
    errors.name = "";
    if (Validator.isEmpty(str)) {
      errors.name = "Name field is required";
    }
  }

  if (field === "password") {
    errors.password = "";
    if (Validator.isEmpty(str)) {
      errors.password = "Password field is required";
    }
  }

  return errors;
};
