const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistrationData(data) {
  // Create empty object for storing validation errors
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please enter your name";
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be at least 2, and no more than 30, characters";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Please enter your email address";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter a password";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Please confirm password";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords do not match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
