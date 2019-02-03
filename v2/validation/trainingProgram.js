const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateTrainingProgramInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.target = !isEmpty(data.target) ? data.target : "";
  data.program_type = !isEmpty(data.program_type) ? data.program_type : "";
  data.gym_location = !isEmpty(data.gym_location) ? data.gym_location : "";
  data.room_number = !isEmpty(data.room_number) ? data.room_number : "";
  data.start_time = !isEmpty(data.start_time) ? data.start_time : "";
  data.end_time = !isEmpty(data.end_time) ? data.end_time : "";
  data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
  data.end_date = !isEmpty(data.end_date) ? data.end_date : "";
  data.day = !isEmpty(data.day) ? data.day : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.total_seat = !isEmpty(data.total_seat) ? data.total_seat : "";

  //Validation for title Field
  if (validator.isEmpty(data.title)) {
    errors.target = "Title field is required";
  }

  //Validation for target Field
  if (validator.isEmpty(data.target)) {
    errors.target = "Title field is required";
  }

  //Validation for program_type Field
  if (validator.isEmpty(data.program_type)) {
    errors.program_type = "Program Type field is required";
  }
  //Validation for location get Field
  if (validator.isEmpty(data.gym_location)) {
    errors.gym_location = "Gym Location field is required";
  }
  //Validation for room get Field
  if (validator.isEmpty(data.room_number)) {
    errors.room_number = "Room Number field is required";
  }
  //Validation for start_time
  if (validator.isEmpty(data.start_time)) {
    errors.start_time = "start_date field is required";
  }
  //Validation for end_time Field
  if (validator.isEmpty(data.end_time)) {
    errors.end_time = "end_time field is required";
  }
  //Validation for start_date Field
  if (validator.isEmpty(data.start_date)) {
    errors.start_date = "start_date field is required";
  }
  //Validation for end_date Field
  if (validator.isEmpty(data.end_date)) {
    errors.end_date = "end_date field is required";
  }
  //Validation for day Field
  if (validator.isEmpty(data.day)) {
    errors.day = "Days field is required";
  }
  //Validation for description Field
  if (validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }
  //Validation for total_seat Field
  if (validator.isEmpty(data.total_seat)) {
    errors.total_seat = "Title field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
