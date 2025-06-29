const User = require("../models/user");

module.exports.showLogin = (req, res) => {
  res.render("login");
};

module.exports.loginUser = (req, res, next) => {
  const passport = require("passport");
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login"
  })(req, res, () => {
    req.flash("success", "Welcome back!");
    res.redirect("/welcome");
  });
};

module.exports.logoutUser = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  });
};

module.exports.showRegister = (req, res) => {
  res.render("register");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { name, username, user_type, password } = req.body;
    const joining_date = Date.now();
    const user = new User({ name, user_type, joining_date, username });
    const newUser = await User.register(user, password);
    req.login(newUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome new user!");
      res.redirect("/welcome");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};
