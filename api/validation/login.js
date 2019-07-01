const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginData(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Please enter your email address";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter your password";
  }

  console.log(errors);

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
