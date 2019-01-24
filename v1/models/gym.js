const mongoose = require("mongoose");

Schema = mongoose.Schema;

const GymSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  total_accomodation: {
    type: String,
    required: true
  },
  facilities: [
    {
      required: true,
      type: String
    }
  ],
  time_open: {
    type: String,
    required: true
  }
});

const Gym = mongoose.model("gym", GymSchema);

module.exports = Gym;
