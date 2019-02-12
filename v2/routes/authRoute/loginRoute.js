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
    // return  res.render("login", { currentUser: currentUser });
    //  return res.status(200).json({ msg: "This is login page" });
    const page = { title: "Login", heading: "Login" };
    res.status(200).render("auth/login", { page: page, currentUser: req.user });
  } else {
    res.status(400).redirect("back");
  }
  // res.status(200).json({ msg: "You are already logged in" });
});

let passportAuthenticate = passport.authenticate("local", {
  failureRedirect: "/login"
  // failureFlash: true
});

router.post("/", passportAuthenticate, (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //res.status(200).json({ msg: "You are now logged in" });

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
    return res.redirect("/client");
  }
  res.redirect("/admin");
});

module.exports = router;
