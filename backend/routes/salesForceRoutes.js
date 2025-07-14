const express = require("express");
const router = express.Router();
const {
  upsertContact,
  getContactByEmail,
} = require("../controllers/salesForceController");

router.post("/upsert-contact", upsertContact);
router.get("/get-contact", getContactByEmail);

module.exports = router;
