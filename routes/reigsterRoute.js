const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../config/keys"),
  passport = require("passport");
const validateRegisterInput = require("../validation/register");

//Get /register form
router.get("/", (req, res) => {
  res.status(200).json({ msg: "THis is register page" });
});

// /register
//Register the user

router.post("/", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json({ msg: errors.email });
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
      });
      //Hash password using bcrypt js to store them securely
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //Set the password to the hashed one
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
