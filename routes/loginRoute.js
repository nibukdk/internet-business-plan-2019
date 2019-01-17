const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../config/keys"),
  passport = require("passport");
const validateLoginInput = require("../validation/login");
//Get /login form
router.get("/", (req, res) => {
  res.status(200).json({ msg: "THis is login page" });
});

// /login
//login the user

router.post("/", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email,
    password = req.body.password;
  User.findOne({ email: email })
    //Check if email/user exists
    .then(user => {
      //If userdoes not exists
      if (!user) {
        errors.email =
          "User not found. Please chekc your email address and try again";
        res.status(404).json(errors);
      }
      //If user exists
      //Compare given password with stored password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //User found
          //Create Jwt Payload
          const payload = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            lastLoggedIn: user.lastLoggedIn
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 }, //Auto logout after 1 hour. Can be increased or decreased or removed
            (err, token) => {
              //Jwt authentication requires web token, can also be used to create protectd route
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
          //Edit last loggedin time
          user.lastLoggedIn = Date.now();
          user.save();
        } else {
          errors.password = "Password do not match";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});
//Logout
router.all("/logout", function(req, res) {
  req.logout();
  //res.redirect("/login");
  res.send('Logged out')
});

module.exports = router;
