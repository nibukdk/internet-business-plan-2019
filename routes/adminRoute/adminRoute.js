const express = require("express"),
  router = express.Router();

const authencation = require("../../middlewares/authentication");

const TrainingProgramModel = require("../../models/trainingProgram");

const eventRoute = require("./EventRoute");
//This proivdes info about local user or current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.get("/", authencation.adminLoggedIn, (req, res) => {
  const page = { title: "Admin" };
  TrainingProgramModel.find({})
    .then(program => {
      res.status(200).render("admin/admin", {
        page: page,
        events: program,
        currentUser: req.user
      });
    })
    .catch(err => res.status(400).json(err));
});

router.use("/", eventRoute);


module.exports = router;
