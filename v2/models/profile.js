const mongoose = require("mongoose");

Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    ref: "users",
    type: Schema.Types.ObjectId
  },
  isEmployee: {
    type: Boolean,
    required: true
  },
  birthDate: {
    type: String
  }
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
