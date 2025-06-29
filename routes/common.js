const express = require("express");
const router = express.Router();
const { welcomePage, aboutPage, profilePage } = require("../controllers/commonController");
const { isLoggedIn } = require("../middleware/auth");

router.get("/welcome", isLoggedIn, welcomePage);
router.get("/about", isLoggedIn, aboutPage);
router.get("/profile", isLoggedIn, profilePage);

module.exports = router;
