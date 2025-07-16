const express = require("express");
const router = express.Router();
const { getApiToken, getAgregated } = require("../controllers/odooController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/apiToken", authMiddleware, getApiToken);
router.get("/aggregated", authMiddleware, getAgregated);
module.exports = router;
