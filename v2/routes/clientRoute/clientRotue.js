const express = require("express"),
  router = express.Router(),
  profile = require("../../models/profile"),
  authentication = require("../../middlewares/authentication");

//This proivdes info about local user or current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  res.render("client/profile", { page: page, currentUser: req.user });
});

//Profile page
router.get("/profile", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  res.render("client/profile", { page: page, currentUser: req.user });
});

//SEE Events

router.get("/events", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Events" };
  res.render("client/events", { page: page, currentUser: req.user });
});

module.exports = router;
