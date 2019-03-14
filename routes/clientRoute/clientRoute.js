const express = require("express"),
  router = express.Router(),
  clientProfile = require("../../models/clientProfile"),
  clientProfileRoute = require("./clientProfileRoute"),
  eventRoute = require("./eventRoute"),
  authentication = require("../../middlewares/authentication");

const Events = require("../../models/trainingProgram");

//This proivdes info about local user or current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.use("/", clientProfileRoute);
router.use("/", eventRoute);

module.exports = router;
