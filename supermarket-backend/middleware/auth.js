// middleware/auth.js

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  next();
};

module.exports.roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.user_type)) {
      return res.status(403).json({ error: "You are not authorized for this action" });
    }
    next();
  };
};
