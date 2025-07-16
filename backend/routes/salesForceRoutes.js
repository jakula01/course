const express = require("express");
const router = express.Router();
const {
  upsertContact,
  getContactByEmail,
} = require("../controllers/salesForceController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/upsert-contact", authMiddleware, upsertContact);
router.get("/get-contact", authMiddleware, getContactByEmail);

module.exports = router;
