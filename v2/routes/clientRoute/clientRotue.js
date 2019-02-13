const express = require("express"),
  router = express.Router(),
  clientProfile = require("../../models/clientProfile"),
  authentication = require("../../middlewares/authentication");

const Events = require("../../models/trainingProgram");

//This proivdes info about local user or current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//Get profile page or dashboard of client
router.get("/", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  clientProfile
    .findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //  console.log(profile);
      } else {
        const newProfile = {};
        (newProfile.phone = req.user.phone),
          (newProfile.user = req.user.id),
          (newProfile.registered_date = req.user.registeredDate);
        clientProfile
          .create(newProfile)
          .then(newProfile => {
            //  console.log(newProfile);
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      throw err;
    });
  //console.log(req.user.id);
  res.render("client/profile", { page: page, currentUser: req.user });
});

//Profile page
router.get("/profile", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  res.render("client/profile", { page: page, currentUser: req.user });
});

//SEE Events

router.get("/events", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Events" };
  Events.find({})
    .then(events => {
      if (events) {
        return res.render("client/events", {
          page: page,
          currentUser: req.user,
          events: events
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
          res.status(400).redirect("back");
          console.log("User is already enrolled");
        }
        //If the user is not enrolled then enroll
        else {
          //Add user to this event
          event.enrolled_clients.push(req.user.id);
          //Change the seats taken value
          event.seats_taken = event.enrolled_clients.length;
          //Now update the value to database
          event.updateOne(event).exec();
          res.status(200).json({ msg: "Clicked Join Event" });
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

        //Redirect to same page after works done
        res.status(200).redirect("back");
      }
    })
    .catch(err => {
      throw err;
    });
});
module.exports = router;
