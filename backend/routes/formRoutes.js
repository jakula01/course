const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createFormHandler,
  deleteFormByIdHandler,
  getAllFormsHandler,
  getAllMyFormsHandler,
  getFormByIdHandler,
  updateFormHandler,
} = require("../controllers/formController");

router.post("/create", authMiddleware, createFormHandler);
router.get("/", getAllFormsHandler);
router.get("/myForms", authMiddleware, getAllMyFormsHandler);
router.get("/:id", getFormByIdHandler);
router.delete("/:id", authMiddleware, deleteFormByIdHandler);
router.put("/:id", authMiddleware, updateFormHandler);
module.exports = router;
