const express = require("express"),
  authentication = require("../middlewares/authentication"),
  router = express.Router();

const Profile = require("../models/profile");

router.get("/", (req, res) => {
  res.send("THis is admin homepage");
});


// router.get("/profile", passport.isLoggedInMiddleWare, (req, res) => {
//   // if (req.user.memberCategory === "student") {
//   //   res.status(200).json({ msg: "This ís student profile" });
//   // } else {
//   //   res.status(200).json({ msg: "This ís admin profile" });
//   // }
//   // const errors = {};
//   // Profile.findOne({ user: req.user.id })
//   //   .then(profile => {
//   //     if (!profile) {
//   //       errors.noprofile = "There is no profile for this user";
//   //       return res.status(404).json(errors);
//   //     }
//   //     res.json(profile);
//   //   })
//   //   .catch(err => res.status(404).json(err));
//   res.status(200).json({ msg: "This ís admin profile" });
// });
module.exports = router;
