const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  jwt = require("passport-jwt"),
  mongoose = require("mongoose"),
  app = express(),
  router = express.Router(),
  cookieParser = require("cookie-parser");

//Import Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const registerRoute = require("./routes/reigsterRoute");
const loginRoute = require("./routes/loginRoute");
const profileRotue = require("./routes/profileRoute");

//Set port for local server
const PORT = 8080;

//Set view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const page = { title: "Home" };
  res.render("index.ejs", { page: page });
});
app.get("/home", (req, res) => {
  const page = { title: "Home" };
  res.render("index.ejs", { page: page });
});
//Logout
app.all("/logout", function(req, res) {
  req.logout();
  //res.redirect("/login");
  res.send("Logged out");
});

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use cookie parser
app.use(cookieParser());
//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(success => console.log("Connected to Db"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config for webtoken
require("./config/passport.js")(passport);

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/profile", loginRoute);
app.listen(PORT || process.env.PORT, err => {
  console.log("App is running at ", PORT);
});
