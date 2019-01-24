const mongoose = require("mongoose");
Schema = mongoose.Schema;

//Create UserSchema
const TrainingProgramSchema = new Schema({
  //title of Workout
  title: {
    type: String,
    required: true
  },
  //name of instructor or self
  instructor: {
    type: String,
    required: true,
    default: "self"
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
  location: {
    type: String,
    required: true,
    default: "Oulu"
  },
  //Time of day
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  //Start Date
  start_date: {
    type: Date,
    required: true
  },
  //End date
  end_date: {
    type: Date,
    required: true
  },
  //Which days of week
  day: [
    {
      type: String,
      required: true,
      default: "everyday"
    }
  ],
  //Description of program
  description: {
    type: String,
    required: true
  },
  //Number of place at one session
  total_seat: {
    type: Number,
    required: true
  },
  //Total number of students Enrolled
  seats_taken: {
    type: Number,
    required: true,
    default:0
  },
  //List of students enrolled
  created_by: {
    ref: "user",
    type: Schema.Types.ObjectId,
  },
  // gym:{
  //   type:Schema.Types.ObjectId,
  //   ref:'gym'
  // }
});

const TrainingProgram = mongoose.model(
  "trainingPrograms",
  TrainingProgramSchema
);

module.exports = TrainingProgram;
