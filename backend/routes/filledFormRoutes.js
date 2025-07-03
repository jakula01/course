const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitFilledForm,
  getMyFilledForms,
} = require("../controllers/filledFormController");

router.post("/:id/fill", authMiddleware, submitFilledForm);
router.get("/myFilledForms", authMiddleware, getMyFilledForms);
module.exports = router;
