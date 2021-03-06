const passport = require("passport");

//Authenitcate middleware that redirects on the basis of login
module.exports.authenticateMiddleware = authenticateMiddleware = passport.authenticate(
  "local",
  {
    successRedirect: "/",
    failureRedirect: "/login"
  }
);

//Check if user is already logged in to use for routes that needs authentication
module.exports.isLoggedInMiddleWare = isLoggedInMiddleWare = (
  req,
  res,
  next
) => {
  // If logged in go to next
  if (req.isAuthenticated()) {
    return next();
  }
  //if not logged in redirect to login route
  res.redirect("/login");
};

//Check if logged user is admin
module.exports.adminLoggedIn = adminLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.memberCategory !== "student") {
    return next();
  }
  // req.flash("error", "You are not allowed for this route");
  // res.redirect("/");
  //Later change this to customer link 
  const page = { title: "Login" };
  res
    .status(403)
    .redirect("/login");
};

// Check if user is client
module.exports.clientLoggedIn = clientLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.memberCategory === "student") {
    return next();
  }
  // req.flash("error", "You are not allowed for this route");
  // res.redirect("/");
  //Later change this to customer link 
  const page = { title: "Login" };
  res
    .status(403)
    .redirect("/login");
};
