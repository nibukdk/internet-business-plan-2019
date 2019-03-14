const express = require("express"),
  router = express.Router(),
  authentication = require("../../middlewares/authentication");

const Events = require("../../models/trainingProgram");

//This proivdes info about local user or current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//SEE Events

router.get("/events", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Events" };
  Events.find({})
    .then(events => {
      if (events) {
        const enrolledEvents = []; //Events That user has joined
        const delistEvents = []; // Events that user not joined
        events.map(event => {
          const userExist = event.enrolled_clients.indexOf(req.user.id);
          if (userExist !== -1) {
            enrolledEvents.push(event);
          } else {
            delistEvents.push(event);
          }
        });

        return res.render("client/events", {
          page: page,
          currentUser: req.user,
          joinedEvents: enrolledEvents,
          notJoinedEvents: delistEvents
        });
      }
    })
    .catch(err => {
      throw err;
    });
});

//Join Events
router.post("/events/join/:id", authentication.clientLoggedIn, (req, res) => {
  //First find Training Program By id
  Events.findById(req.params.id)
    .then(event => {
      //First check if seats are available
      if (
        event.total_seat === event.seats_taken ||
        event.total_seat < event.seats_taken
      ) {
        res.status(400).json({ err: "No seats available for this event" });
      } else {
        //Now check if the user is already enrolled
        const userExistence = event.enrolled_clients.indexOf(req.user.id);
        if (userExistence !== -1) {
          // Users exists to redirect back
          req.flash(
            "danger",
            "You have already been enrolled in ",
            event.title.toUpperCase(),
            "event by instructor ",
            event.instructor.toUpperCase(),
            "."
          );
          res.status(400).redirect("back");
        }
        //If the user is not enrolled then enroll
        else {
          //Add user to this event
          event.enrolled_clients.push(req.user.id);
          //Change the seats taken value
          event.seats_taken = event.enrolled_clients.length;
          //Now update the value to database
          event.updateOne(event).exec();
          req.flash(
            "success",
            "You have joined the event ",
            event.title.toUpperCase(),
            ". By instructor ",
            event.instructor.toUpperCase(),
            "."
          );
          res.status(200).redirect("back");
        }
      }
    })
    .catch(err => {
      throw err;
    });
});

//Cancel Joined Events
router.post("/events/cancel/:id", authentication.clientLoggedIn, (req, res) => {
  //First find Training Program By id
  Events.findById(req.params.id)
    .then(event => {
      //Find the index of enrolled user in the array
      //Now check if the user is already enrolled or not
      const indexOfUser = event.enrolled_clients.indexOf(req.user.id);
      if (indexOfUser === -1) {
        // Users is not enrolled so, redirect back
        res.status(400).redirect("back");
      }
      //If the user is already enrolled then remove
      else {
        // Remove the user providing the index in immutable manner
        const clientsArray = [...event.enrolled_clients];
        clientsArray.splice(indexOfUser, 1);
        event.enrolled_clients = [...clientsArray];

        //Change the seats taken value
        event.seats_taken = event.enrolled_clients.length;
        //Save the updated values
        event.updateOne(event).exec();
        req.flash(
          "success",
          "You have cancelled your enrollment in ",
          event.title.toUpperCase(),
          " evnent by instructor ",
          event.instructor.toUpperCase(),
          "."
        );
        //Redirect to same page after works done
        res.status(200).redirect("back");
      }
    })
    .catch(err => {
      throw err;
    });
});
module.exports = router;
