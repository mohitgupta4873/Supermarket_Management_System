const express = require("express");
const router = express.Router();
const {
  showBillForm,
  generateBill,
  printBill,
} = require("../controllers/clerkController");
const { isLoggedIn, roleCheck } = require("../middleware/auth");

router.get("/bill", isLoggedIn, roleCheck("Clerk"), showBillForm);
router.post("/bill", isLoggedIn, roleCheck("Clerk"), generateBill);
router.get("/print", isLoggedIn, roleCheck("Clerk"), printBill);

module.exports = router;
