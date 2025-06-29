module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.roleCheck = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.user_type !== role) {
      req.flash("error", `Only ${role}s are authorized for this action`);
      return res.redirect("/welcome");
    }
    next();
  };
};
