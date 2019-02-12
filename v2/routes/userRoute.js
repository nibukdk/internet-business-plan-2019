const express = require("express"),
  
  router = express.Router();
//Set port for local server

router.get("/profile", (req, res) => {
  res.send("This is user profile page");
});

module.exports = router;
