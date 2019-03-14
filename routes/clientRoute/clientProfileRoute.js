const express = require("express"),
  router = express.Router(),
  clientProfile = require("../../models/clientProfile"),
  authentication = require("../../middlewares/authentication");

const validateClientProfileInput = require("../../validation/clientProfileValidation");

// const Events = require("../../models/trainingProgram");

//This proivdes info about local user or current user
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//Get or Create Profile
//Get profile page or dashboard of client
router.get("/", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  clientProfile
    .findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //  console.log(profile);
        return res.render("client/profile", {
          page: page,
          currentUser: req.user,
          userProfile: profile
        });
      } else {
        const newProfile = {};
        (newProfile.phone = req.user.phone),
          (newProfile.user = req.user.id),
          (newProfile.register_date = req.user.registeredDate),
          (newProfile.name = req.user.name);
        clientProfile
          .create(newProfile)
          .then(newProfile => {
            //  console.log(newProfile);
          })
          .catch(err => {
            throw err;
          });
        return res.redirect("/client/profile");
      }
    })
    .catch(err => {
      throw err;
    });
  //console.log(req.user.id);
});

//Get or Read Profile
//Profile page
router.get("/profile", authentication.clientLoggedIn, (req, res) => {
  const page = { title: "Profile" };
  //res.render("client/profile", { page: page, currentUser: req.user });
  res.redirect("/client");
});

//Update profile Post route
router.post("/profile/update/:id", (req, res) => {
  // res.send("Profile Updated");
  const { errors, isValid } = validateClientProfileInput(req.body);
  if (isValid) {
    const newProfile = {};
    (newProfile.address = req.body.address),
      (newProfile.image = req.body.image),
      (newProfile.birth_date = req.body.birth_date),
      (newProfile.hobbies = req.body.hobbies);
    //Find Client Profile
    clientProfile
      .findById(req.params.id)
      .then(profile => {
        profile.updateOne(newProfile).exec();
        console.log(profile);
      })
      .catch(err => {
        throw err;
      });
    res.status(200).redirect("/client/profile");
  } else {
    console.log('Error')
    res.status(400).redirect("back");
  }
});

module.exports = router;
