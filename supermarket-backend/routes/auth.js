const express = require("express");
const router = express.Router();
const {
  registerUser,
  showRegister,
  showLogin,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middleware/auth");

router.get("/register", showRegister);
router.post("/register", registerUser);

router.get("/login", showLogin);
router.post("/login", loginUser);

router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;
