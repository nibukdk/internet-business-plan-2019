const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.username= !isEmpty(data.username) ? data.username : '';
    data.phone= !isEmpty(data.phone) ? data.phone : '';
    //Validation for Name field
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 characters.';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    //Check for username is empty
    if (validator.isEmpty(data.username)) {
        errors.username = 'User Name field is required field is required';
    }
    //Validation for Email Field
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
      }
    
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    
    // Validation for Password Field
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password  must be atleast  6 characters.';
    }

    //Validation for Password confirmation field
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match';
    }
    //Check phone number empty
    if (validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number field is required';
    }
    //Check if phone is valid just for Finland now
    if (validator.isMobilePhone(data.phone,'fi-FI')) {
        errors.phone = 'Please check your phone number. It should include "+" with country code';
    }
    
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}