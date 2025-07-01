// ✅ This is the updated backend ready for React
// All `res.render()` calls are replaced with `res.json()` or status codes
// Errors return `res.status(400|500).json({ error: '...' })`

// 1. index.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const cors = require("cors");

const User = require("./models/user");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/supermarket");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Database connected"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "supermarketapp",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const authRoutes = require("./routes/auth");
const managerRoutes = require("./routes/manager");
const clerkRoutes = require("./routes/clerk");
const commonRoutes = require("./routes/common");

app.use("/api", authRoutes);
app.use("/api", commonRoutes);
app.use("/api", managerRoutes);
app.use("/api", clerkRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
