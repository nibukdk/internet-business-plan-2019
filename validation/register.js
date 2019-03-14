const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateRegisterInput = data => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.memberCategory = !isEmpty(data.memberCategory)
    ? data.memberCategory
    : "";

  let category = data.memberCategory;
  let isOnList = null;

  // Custom Function to Check Phone Number Validation
  let phoneNumberValidation = num => {
    let firstString = num.slice(0, 1),
      secondPart = num.slice(1, 4),
      thirdPart = num.slice(4);
    if (firstString === "+") {
      if (secondPart === "358") {
        if (thirdPart.length === 9 || thirdPart.length === 10) {
          return {
            msg: "Correct Number",
            isCorrect: true
          };
        }
        return {
          msg: "Check your phone number again",
          isCorrect: false
        };
      }
      return {
        msg: "Please insert international number format for finland 358",
        isCorrect: false
      };
    }
    return {
      msg: "Please Put + in the beginning",
      isCorrect: false
    };
  };

  //Switch category checking is its on the list of roles
  switch (category) {
    case "student":
      isOnList = true;
      break;
    case "management":
      isOnList = true;
      break;
    case "admin":
      isOnList = true;
      break;
    case "instructor":
      isOnList = true;
      break;
    default:
      isOnList = false;
  }

  //Validation for Name field
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 characters.";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  //Check for username is empty
  if (validator.isEmpty(data.username)) {
    errors.username = "User Name field is required field is required";
  }
  //Validation for Email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Validation for Password Field
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password  must be atleast  6 characters.";
  }
  //Validation for Password confirmation field
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }

  //Check if phone is valid just for Finland now
  if (!phoneNumberValidation(data.phone).isCorrect) {
    errors.phone = phoneNumberValidation(data.phone).msg;
  }
  //Check phone number empty
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone number field is required";
  }
  //Check phone number empty
  if (validator.isEmpty(data.memberCategory)) {
    errors.memberCategory =
      "Provide value for member category field is required";
  }
  if (isOnList === false) {
    errors.memberCategory = "Checkout member type";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
