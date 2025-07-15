const express = require("express");
const router = express.Router();
const { uploadTicket } = require("../controllers/ticketController");

router.post("/upload", uploadTicket);

module.exports = router;
