const express = require("express");
const router = express.Router();
const { uploadTicket } = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/upload", authMiddleware, uploadTicket);

module.exports = router;
