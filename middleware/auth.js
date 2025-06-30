module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.user_type)) {
      req.flash("error", "You are not authorized for this action");
      return res.redirect("/welcome");
    }
    next();
  };
};
