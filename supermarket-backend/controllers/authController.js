const User = require("../models/user");
const passport = require("passport");

module.exports.showLogin = (req, res) => {
  res.json({ message: "Login page route" });
};

module.exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user: req.user });
    });
  })(req, res, next);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
};

module.exports.showRegister = (req, res) => {
  res.json({ message: "Register page route" });
};

module.exports.registerUser = async (req, res) => {
  try {
    const { name, username, user_type, password } = req.body;
    const joining_date = Date.now();
    const user = new User({ name, user_type, joining_date, username });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.status(201).json({ message: "Registration successful", user: newUser });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
