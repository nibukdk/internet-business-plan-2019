const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  jwt = require("passport-jwt"),
  router = express.Router();
//Set port for local server
const PORT = 8080;

router.get("/profile", (req, res) => {
  res.send("This is user admin page");
});

module.exports = router;
