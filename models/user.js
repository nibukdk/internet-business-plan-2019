const mongoose = require("mongoose");
Schema = mongoose.Schema;
//Create UserSchema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  memberCategory: {
    type: String,
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },

  profile: {
    ref: "profile",
    type: Schema.Types.ObjectId
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
