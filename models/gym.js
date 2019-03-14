const mongoose = require("mongoose");

Schema = mongoose.Schema;

const GymSchema = new mongoose.Schema({
  location: {
    type: String,
    enum: ["Kotkantie 1 ", "Peltolankaari 6B", "Hanhitie 17"]
  },

  rooms: {
    type: String,
    enum: ["201", "202", "203", "204", "205", "206", "207", "208"]
  }
});

const Gym = mongoose.model("gym", GymSchema);

module.exports = Gym;
