const mongoose = require("mongoose");

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
    unique:true
  },
  phone: {
    type: String,
    required: true
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
