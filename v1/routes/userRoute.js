const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  jwt = require("passport-jwt"),
  router = express.Router();
//Set port for local server

router.get("/profile", (req, res) => {
  res.send("This is user profile page");
});

module.exports = router;
