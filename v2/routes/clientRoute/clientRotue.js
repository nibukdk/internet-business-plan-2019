const express = require("express"),
  router = express.Router(),
  profile = require("../../models/profile");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", (req, res) => {
  const page = { title: "Profile" };
  res.render("clientRoute/profile", { page: page });
});

module.exports = router;
