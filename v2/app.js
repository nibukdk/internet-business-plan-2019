const express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  app = express();
const TrainingProgramModel = require("./models/trainingProgram");

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
  session({
    secret: "Login is necessary",
    resave: false,
    saveUninitialized: false,
    //Expires in one hour value given in milliseconds
    cookie: { _expires: 3600000 }
  })
);

app.use(passport.initialize());
//THis should always be declated after express session
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

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
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
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
  TrainingProgramModel.find({})
    .then(events => {
      res.render("index.ejs", {
        page: page,
        events: events,
        currentUser: req.user
      });
    })
    .catch(err => res.status(400).json(err));
});
app.get("/home", (req, res) => {
  const page = { title: "Home" };
  TrainingProgramModel.find({})
    .then(events => {
      res.render("index.ejs", {
        page: page,
        events: events,
        currentUser: req.user
      });
    })
    .catch(err => res.status(400).json(err));
});
//Logout
app.get("/logout", (req, res) => {
  req.logout();
  //res.redirect("/");
  res.redirect("/");
});

// app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
// app.use("/profile", loginRoute);

app.listen(PORT || process.env.PORT, err => {
  console.log("App is running at ", PORT);
});
