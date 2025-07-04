const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitFilledForm,
  getMyFilledForms,
  getFilledByFormHandler,
} = require("../controllers/filledFormController");

router.post("/:id/fill", authMiddleware, submitFilledForm);
router.get("/myFilledForms", authMiddleware, getMyFilledForms);
router.get("/:id", authMiddleware, getFilledByFormHandler);

module.exports = router;
