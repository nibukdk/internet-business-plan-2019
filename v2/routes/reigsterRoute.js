var express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user.js");

const validateRegisterInput = require("../validation/register");

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
//Prevent back button after logout
router.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

//Registration route
router.get("/", (req, res) => {
  const page = { title: "Register" };
  res.status(200).render("register", { page: page, currentUser: req.user });
  //const page = { title: "Register" };
  //res.status(200).render("register", { page: page });
});

router.post("/", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json({ msg: errors.email });
      } else {
        User.findOne({ username: req.body.username })
          .then(user => {
            if (user) {
              errors.username = "Username already exists";
              return res.status(400).json({ msg: errors.username });
            } else {
              const password = req.body.password;
              const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                memberCategory: req.body.memberCategory
              });
              User.register(newUser, password, (err, newUser) => {
                if (err) {
                  // console.log(err);
                  return res.redirect("back");
                  //res.send("Error");
                }
                passport.authenticate("local")(req, res, function() {
                  if (req.user.memberCategory === "student") {
                    return res.redirect("/"); //Later replace it with client page
                  }
                  res.redirect("/admin");
                });
              });
            }
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      throw err;
    });
});
module.exports = router;
