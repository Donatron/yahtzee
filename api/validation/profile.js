const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileData(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Please enter a user name";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Please enter your location";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Please enter your country";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
