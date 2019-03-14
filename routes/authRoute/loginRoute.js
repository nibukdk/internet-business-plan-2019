const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../../models/user.js");
const validateLoginInput = require("../../validation/login");
//Find current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
//Prevent back button after logout
router.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

//Login Route
router.get("/", (req, res) => {
  let currentUser = req.user;
  if (!currentUser) {
    const page = { title: "Login", heading: "Login" };
    res.status(200).render("auth/login", { page: page, currentUser: req.user });
  } else {
    req.flash("danger", "User is already logged in");
    res.status(400).redirect("back");
  }
});

let passportAuthenticate = passport.authenticate("local", {
  failureRedirect: "/login"
  // failureFlash: true
});
router.post("/", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (isValid) {
    User.findOneAndUpdate(
      { username: req.user },
      { lastLoggedIn: Date.now() },
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );

    //Check if user is admin or not IMPORTANT
    if (req.user.memberCategory === "student") {
      req.flash("success", "Welcome " + req.user.username.toUpperCase() + "!");
      return res.redirect("/client");
    }
    req.flash("success", "Welcome " + req.user.username.toUpperCase() + "!");
    res.redirect("/admin");
  } else {
    Object.keys(errors).map(key => {
       req.flash("danger", errors[key]);
    });
  }
});

module.exports = router;
