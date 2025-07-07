const router = require("express").Router();
const {
  addCommentHandler,
  getAllCommentsHandler,
  addLikeHandler,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/:id", getAllCommentsHandler);
router.post("/comment", authMiddleware, addCommentHandler);
router.put("/like", authMiddleware, addLikeHandler);

module.exports = router;
