const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");

const User = require("./models/user");

const app = express();

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/supermarket");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Database connected"));

// EJS & Middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Session config
app.use(session({
  secret: "supermarketapp",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 2
  }
}));

app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global template variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const authRoutes = require("./routes/auth");
const managerRoutes = require("./routes/manager");
const clerkRoutes = require("./routes/clerk");
const commonRoutes = require("./routes/common");

app.use("/", authRoutes);
app.use("/", commonRoutes);
app.use("/manager", managerRoutes);
app.use("/clerk", clerkRoutes);

// Server
app.listen(3000, () => console.log("Server running on port 3000"));
