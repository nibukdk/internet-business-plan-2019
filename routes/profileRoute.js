const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  jwt = require("passport-jwt"),
  router = express.Router();
const Profile = require("../models/profile");
//Set port for local server

/*
 *  //title of Workout
  title: {
    type: String,
    required: true
  },
  //name of instructor or self
  instructor: {
    type: String,
    required: true,
    default:'self'
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
 */
router.get("/", (req, res) => {
  res.send("THis is admin homepage");
});
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.memberCategory === "student") {
      res.status(200).json({ msg: "This ís student profile" });
    } else {
      res.status(200).json({ msg: "This ís admin profile" });
    }
    // const errors = {};
    // Profile.findOne({ user: req.user.id })
    //   .then(profile => {
    //     if (!profile) {
    //       errors.noprofile = "There is no profile for this user";
    //       return res.status(404).json(errors);
    //     }
    //     res.json(profile);
    //   })
    //   .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
