const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  jwt = require("passport-jwt"),
  router = express.Router();

const TrainingProgramModel = require("../models/trainingProgram");

//This proivdes info about local user or current user
router.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

router.get("/", (req, res) => {
  res.send("THis is admin homepage");
});

router.get(
  "/set-program",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.memberCategory === "student") {
      res.status(200).json({ msg: "You are not allowed to set program" });
    } else {
      res.send("Create from for this page");
    }
  }
);

router.post(
  "/set-program",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const TrainingProgram = {};
    const errors = {};
    if (req.user.memberCategory === "student") {
      res.status(200).json({ msg: "You are not allowed to set program" });
    } else {
      // res.status(200).json({msg:'This is admin set program page'})
      (TrainingProgram.title = req.body.title),
        (TrainingProgram.instructor = req.body.instructor),
        (TrainingProgram.target = req.body.target),
        (TrainingProgram.program_type = req.body.program_type),
        (TrainingProgram.location = req.body.location),
        (TrainingProgram.time = req.body.time),
        (TrainingProgram.day = req.body.day),
        (TrainingProgram.start_date = req.body.start_date),
        (TrainingProgram.end_date = req.body.end_date),
        (TrainingProgram.description = req.body.description),
        (TrainingProgram.total_seat = req.body.total_seat),
        (TrainingProgram.seats_taken = req.body.seats_taken),
        (TrainingProgram.created_by = req.user.id);
      new TrainingProgramModel(TrainingProgram)
        .save()
        .then(program => res.json(program)); //Later add views here
    }
  }
);
//Get program edit
router.get(
  "/edit_program/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    TrainingProgramModel.findById(req.params.id)
      .then(program => {
        if (!program) {
          console.log("Program not found");
          res.status(404).json((errors.msg = "Requested program not found"));
        } else {
          // res.render('edit',{program:program})
          res.status(200).json(program);
          //console.log(program);
        }
      })
      .catch(err => {
        throw err;
      });
  }
);

//post program edit
router.put(
  "/edit_program/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const TrainingProgram = {},
      errors = {};
    (TrainingProgram.title = req.body.title),
      (TrainingProgram.instructor = req.body.instructor),
      (TrainingProgram.target = req.body.target),
      (TrainingProgram.program_type = req.body.program_type),
      (TrainingProgram.location = req.body.location),
      (TrainingProgram.time = req.body.time),
      (TrainingProgram.day = req.body.day),
      (TrainingProgram.start_date = req.body.start_date),
      (TrainingProgram.end_date = req.body.end_date),
      (TrainingProgram.description = req.body.description),
      (TrainingProgram.total_seat = req.body.total_seat),
      (TrainingProgram.seats_taken = req.body.seats_taken);

    TrainingProgramModel.findById(req.params.id)
      .then(program => {
        if (!program) {
          res.status(404).json((errors.msg = "Requested program not found"));
        } else {
          //If program is found then update
          program.updateOne(TrainingProgram).exec();
          res.status(200).json(program);
          //res.status(200).render("name of view", { program });
        }
      })
      .catch(err => {
        throw err;
      });
  }
);
module.exports = router;
