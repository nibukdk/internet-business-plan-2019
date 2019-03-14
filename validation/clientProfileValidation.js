const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateClientProfileInput = data => {
  let errors = {};

  data.address = !isEmpty(data.address) ? data.address : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.birth_date = !isEmpty(data.birth_date) ? data.birth_date : "";
  data.hobbies = !isEmpty(data.hobbies) ? data.hobbies : "";

  //Validation for Image Field
  if (!validator.isURL(data.image)) {
    errors.image = "Image URL is invalid";
  }

  if (validator.isEmpty(data.image)) {
    errors.image = "Email field is required";
  }

  // Validation for Address Field
  if (validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
  // Validation for Hobbies Field
  if (validator.isEmpty(data.hobbies)) {
    errors.hobbies = "Hobbies field is required";
  }
  // Validation for Address Field
  if (validator.isEmpty(data.birth_date)) {
    errors.birth_date = "Birth Date field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
