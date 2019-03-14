const mongoose = require("mongoose");

Schema = mongoose.Schema;

// Create Schema
const clientProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  image: { type: String },
  name: {
    type: String
  },
  register_date: {
    type: Date
  },
  last_loggedIn: {
    type: Date,
    default: Date.now
  },
  birth_date: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  hobbies: [{ type: String }],

  enrolled_events: [{ type: Schema.Types.ObjectId }]
});

const clientProfile = mongoose.model("clientProfiles", clientProfileSchema);

module.exports = clientProfile;
