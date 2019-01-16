const mongoose = require("mongoose");

//Create UserSchema
const TrainingProgramSchema = mongoose.Schema({
  //title of Workout
  title: {
    type: String,
    required: true
  },
  //name of instructor or self
  instructor: {
    type: String,
    required: true
  },
  // Goal of training program
  target: {
    type: String,
    required: true
  },
  //What is type of train program for eg: yoga, weights, cardio
  program_type: {
    type: String,
    required: true
  },
  //Location of gym if multiple locations
  locatoin: {
    type: String,
    required: true
  },
  //Time of day
  time: {
    type: String,
    required: true
  },
  //Start Date
  start_date: {
    type: String,
    required: true
  },
  //End date
  end_date: {
    type: String,
    required: true
  },
  //Which days of week
  day: [
    {
      type: String,
      required: true
    }
  ],
  //Description of program
  description: {
    type: String,
    required: true
  },
  //Number of place at one session
  total_seat: {
    type: String,
    required: true
  },
  //Total number of students Enrolled
  seats_taken: {
    type: String,
    required: true
  },
  //List of students enrolled
  enrolled_students: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});

const TrainingProgram = mongoose.model(
  "trainingPrograms",
  TrainingProgramSchema
);

module.exports = TrainingProgram;
