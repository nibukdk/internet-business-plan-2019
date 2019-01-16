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
   
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}