const {
  addComment,
  addLike,
  getAllComments,
} = require("../models/feedbackModel");

const addLikeHandler = async (req, res) => {
  const { formId } = req.body;
  try {
    await addLike(formId);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Error while adding like:", err);
    res.status(500).json({ error: "Failed to add like" });
  }
};

const getAllCommentsHandler = async (req, res) => {
  console.log(req.params.id);
  const formId = req.params.id;
  try {
    const comments = await getAllComments(formId);
    res.status(201).json({ comments });
  } catch (err) {
    console.error("Error while getting comments:", err);
    res.status(500).json({ error: "Failed to get comments" });
  }
};

const addCommentHandler = async (req, res) => {
  const { formId, message } = req.body;
  const email = req.user.email;
  if (!message?.trim()) {
    return res.status(400).json({ error: "Комментарий пустой" });
  }
  try {
    const comment = await addComment(formId, email, message.trim());
    res.status(201).json({ comment });
  } catch (err) {
    console.error("Error while adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};
module.exports = {
  addCommentHandler,
  getAllCommentsHandler,
  addLikeHandler,
};
