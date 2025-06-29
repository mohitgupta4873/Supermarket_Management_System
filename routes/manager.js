const express = require("express");
const router = express.Router();
const { showStats, filterStats, showInventory, addItem, updateItem } = require("../controllers/managerController");
const { isLoggedIn, roleCheck } = require("../middleware/auth");

router.get("/stat", isLoggedIn, roleCheck("Manager"), showStats);
router.post("/stat", isLoggedIn, roleCheck("Manager"), filterStats);

router.get("/inventory", isLoggedIn, roleCheck("Manager"), showInventory);
router.post("/add", isLoggedIn, roleCheck("Manager"), addItem);
router.post("/updateItems", isLoggedIn, roleCheck("Manager"), updateItem);

module.exports = router;
