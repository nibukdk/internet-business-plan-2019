const express = require("express"),
  router = express.Router();

const authencation = require("../../middlewares/authentication");
const validateTrainProgramInput = require("../../validation/trainingProgram");

const Event = require("../../models/trainingProgram");

router.get("/set-program", authencation.adminLoggedIn, (req, res) => {
  // res.json({ msg: "ok" });
  const page = { title: "New Routine" };

  res.render("admin/createProgram", { page: page, currentUser: req.user });
});

router.post("/set-program", authencation.adminLoggedIn, (req, res) => {
  //console.log(req.body);
  const { errors, isValid } = validateTrainProgramInput(req.body);
  const page = { title: "Homepage" };

  const TrainingProgram = {};
  if (isValid) {
    // res.status(200).json({msg:'This is admin set program page'})
    (TrainingProgram.title = req.body.title),
      (TrainingProgram.instructor = req.body.instructor),
      (TrainingProgram.target = req.body.target),
      (TrainingProgram.program_type = req.body.program_type),
      (TrainingProgram.gym_location = req.body.gym_location),
      (TrainingProgram.room_number = req.body.room_number),
      (TrainingProgram.start_time = req.body.start_time),
      (TrainingProgram.end_time = req.body.end_time),
      (TrainingProgram.day = req.body.day),
      (TrainingProgram.start_date = req.body.start_date),
      (TrainingProgram.end_date = req.body.end_date),
      (TrainingProgram.description = req.body.description),
      (TrainingProgram.total_seat = req.body.total_seat),
      (TrainingProgram.seats_taken = req.body.seats_taken),
      (TrainingProgram.created_by = req.user.id);

    Event.create(TrainingProgram)
      .then(program => {
        req.flash(
          "success",
          "You have created " + program.title.toUpperCase() + "."
        );
        res.redirect("/admin");
      })
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    Object.keys(errors).map(key => {
      req.flash("danger", errors[key]);
    });

    res.redirect("back");
  }
});

//Get program edit
router.get("/edit_program/:id", authencation.adminLoggedIn, (req, res) => {
  const errors = {};
  const page = { title: "Edit Event" };
  Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        // console.log("Program not found");
        res.status(404).json((errors.msg = "Requested program not found"));
      } else {
        res.status(200).render("admin/editEvent", {
          page: page,
          event: event,
          currentUser: req.user
        });
        // res.status(200).json(program);
        //console.log(program);
      }
    })
    .catch(err => {
      throw err;
    });
});

//post program edit
router.put("/edit_program/:id", authencation.adminLoggedIn, (req, res) => {
  const { errors, isValid } = validateTrainProgramInput(req.body);
  const TrainingProgram = {};
  (TrainingProgram.title = req.body.title),
    (TrainingProgram.instructor = req.body.instructor),
    (TrainingProgram.target = req.body.target),
    (TrainingProgram.program_type = req.body.program_type),
    (TrainingProgram.gym_location = req.body.gym_location),
    (TrainingProgram.room_number = req.body.room_number),
    (TrainingProgram.start_time = req.body.start_time),
    (TrainingProgram.end_time = req.body.end_time),
    (TrainingProgram.day = req.body.day),
    (TrainingProgram.start_date = req.body.start_date),
    (TrainingProgram.end_date = req.body.end_date),
    (TrainingProgram.description = req.body.description),
    (TrainingProgram.total_seat = req.body.total_seat),
    (TrainingProgram.seats_taken = req.body.seats_taken),
    (TrainingProgram.created_by = req.user.id);

  if (isValid) {
    Event.findById(req.params.id)
      .then(event => {
        if (!event) {
          res.status(404).redirect("back");
        } else {
          //If program is found then update
          event.updateOne(TrainingProgram).exec();
        
          res.redirect("/admin");
          //res.status(200).render("name of view", { program });
        }
      })
      .catch(err => {
        throw err;
      });
  } else {
    Object.keys(errors).map(key => {
      console.log(errors[key]);
      return req.flash("danger", errors[key]);
    });

    res.redirect("back");
  }
});

//delte program
router.delete("/delete/:id", authencation.adminLoggedIn, (req, res) => {
  Event.findByIdAndRemove(req.params.id)
    .then(success => {
      req.flash("info", "Selected program has been deleted.");
      res.status(200).redirect("/admin");
    })
    .catch(err => {
      //res.status(400).redirect("back");
      req.flash("danger", "Selected program cannot be deleted.Please try agin");
      res.redirect("back");
    });
});
module.exports = router;
