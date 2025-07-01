const express = require("express");
const router = express.Router();
const {
  showStats,
  filterStats,
  showInventory,
  addItem,
  updateItem,
} = require("../controllers/managerController");
const { isLoggedIn, roleCheck } = require("../middleware/auth");

router.get("/stat", isLoggedIn, roleCheck("Manager"), showStats);
router.post("/stat", isLoggedIn, roleCheck("Manager"), filterStats);

// Shared with Staff
router.get("/inventory", isLoggedIn, roleCheck("Manager", "Staff"), showInventory);
router.post("/updateItems", isLoggedIn, roleCheck("Manager", "Staff"), updateItem);

// Add item still restricted to Manager
router.post("/add", isLoggedIn, roleCheck("Manager"), addItem);

module.exports = router;
