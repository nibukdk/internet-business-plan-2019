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

router.get("/", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  clientProfile
    .findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        console.log(profile);
      } else {
        const newProfile = {};
        (newProfile.phone = req.user.phone),
          (newProfile.user = req.user.id),
          (newProfile.registered_date = req.user.registeredDate);
        clientProfile
          .create(newProfile)
          .then(newProfile => {
            console.log(newProfile);
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      throw err;
    });
  console.log(req.user.id);
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
router.post("/events/join/:id", (req, res) => {
  res.send("You have joined this event");
});

module.exports = router;
