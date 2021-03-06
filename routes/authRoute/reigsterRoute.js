var express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../../models/user.js"),
  authentication = require("../../middlewares/authentication");

const validateRegisterInput = require("../../validation/register");

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
router.get("/", authentication.adminLoggedIn,(req, res) => {
  const page = { title: "Register" };
  res
    .status(200)
    .render("auth/register", { page: page, currentUser: req.user });
  //const page = { title: "Register" };
  //res.status(200).render("register", { page: page });
});

router.post("/", authentication.adminLoggedIn, (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    Object.keys(errors).map(key => {
      req.flash("danger", errors[key]);
    });
    return res.status(400).redirect("back");
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
                  req.flash(
                    "danger",
                    "Something went wrong. Please try again."
                  );
                  return res.redirect("back");
                  //res.send("Error");
                }

                req.flash(
                  "success",
                  "Congratulations," +
                    newUser.username.toUpperCase() +
                    " has been successfully registered"
                );

                res.redirect("/admin");
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
