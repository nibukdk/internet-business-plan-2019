const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user"),
  app = express();

//Import Routes
// const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const registerRoute = require("./routes/reigsterRoute");
const loginRoute = require("./routes/loginRoute");
// const profileRotue = require("./routes/profileRoute");

//Set port for local server
const PORT = 8080;

//Deine static files path
app.use(express.static(__dirname + "/public/"));
//Setup bpdy parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set view engine
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//use passport and set session
app.use(
  require("express-session")({
    secret: "Login is necessary",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     });
//   })
// );

//Prevent back button after logout
app.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

//Get current user
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//Home page
app.get("/", (req, res) => {
  const page = { title: "Home" };
  res.render("index.ejs", { page: page });
});
app.get("/home", (req, res) => {
  const page = { title: "Home" };
  res.render("index.ejs", { page: page });
});
//Logout
app.get("/logout", (req, res) => {
  req.logout();
  //res.redirect("/");
  res.send("You are now logged out");
});

// app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
// app.use("/profile", loginRoute);

app.listen(PORT || process.env.PORT, err => {
  console.log("App is running at ", PORT);
});
