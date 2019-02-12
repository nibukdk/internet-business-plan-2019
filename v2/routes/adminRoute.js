const express = require("express"),
  router = express.Router(),
  moment = require("moment");

const authencation = require("../middlewares/authentication");
const validateTrainProgramInput = require("../validation/trainingProgram");

const TrainingProgramModel = require("../models/trainingProgram");
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// --------------------------
const startOfWeek = moment().startOf("week"),
  endOfWeek = moment().endOf("week");

const days = [];
let day = startOfWeek;

while (day <= endOfWeek) {
  days.push(day.toDate().toDateString());
  day = day.clone().add(1, "d");
}
//---------------------------
router.get("/", authencation.adminLoggedIn, (req, res) => {
  const page = { title: "Admin" };
  TrainingProgramModel.find({})
    .then(program => {
      res.status(200).render("admin", {
        page: page,
        events: program,
        currentUser: req.user,
        daysOfWeek:days
      });
    })
    .catch(err => res.status(400).json(err));
});

router.get("/set-program", authencation.adminLoggedIn, (req, res) => {
  const page = { title: "New Routine" };

  res.render("createProgram", { page: page, currentUser: req.user });
});

router.post("/set-program", authencation.adminLoggedIn, (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateTrainProgramInput(req.body);
  const page = { title: "Homepage" };

  const TrainingProgram = {};
  if (isValid) {
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

    TrainingProgramModel.create(TrainingProgram)
      .then(program => res.redirect("/admin"))
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json(errors);
  }
});

//Get program edit
router.get("/edit_program/:id", authencation.adminLoggedIn, (req, res) => {
  const errors = {};
  const page = { title: "Edit Event" };
  TrainingProgramModel.findById(req.params.id)
    .then(event => {
      if (!event) {
        console.log("Program not found");
        res.status(404).json((errors.msg = "Requested program not found"));
      } else {
        res.status(200).render("editEvent", {
          page: page,
          event: event,
          currentUser: req.user
        });
      }
    })
    .catch(err => {
      throw err;
    });
});

//post program edit
router.put("/edit_program/:id", authencation.adminLoggedIn, (req, res) => {
  const TrainingProgram = {},
    errors = {};
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

  TrainingProgramModel.findById(req.params.id)
    .then(event => {
      if (!event) {
        res.status(404).redirect("back");
      } else {
        //If program is found then update
        event.updateOne(TrainingProgram).exec();
        res.redirect("/admin");
      }
    })
    .catch(err => {
      throw err;
    });
});

//delte program
router.delete("/delete/:id", authencation.adminLoggedIn, (req, res) => {
  TrainingProgramModel.findByIdAndRemove(req.params.id)
    .then(success => {
      res.status(200).redirect("/admin");
    })
    .catch(err => {
      //res.status(400).redirect("back");
      res.status(400).json(err);
    });
});
module.exports = router;
