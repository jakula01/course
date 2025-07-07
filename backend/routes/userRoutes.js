const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  fetchUsers,
  deleteUsers,
  updateStatus,
} = require("../controllers/usersController");

router.get("/get", authMiddleware, fetchUsers);

router.post("/delete", authMiddleware, deleteUsers);

router.post("/update-status", authMiddleware, updateStatus);

module.exports = router;
