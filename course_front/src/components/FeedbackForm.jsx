import { sendComment, sendLike } from "../api/feedback";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function FeedbackForm({ template, onSend }) {
  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("");

  const handleSendFeedback = async () => {
    if (comment.trim()) await sendComment(template.id, comment.trim());
    if (liked) await sendLike(template.id);
    if (onSend) onSend();
  };
  const { t } = useTranslation();

  return (
    <>
      <textarea
        className="form-control mb-3"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("commentPlaceholder")}
      />
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="likeCheck"
          checked={liked}
          onChange={(e) => setLiked(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="likeCheck">
          👍 {t("likeIt")}
        </label>
      </div>
      <button className="btn btn-success w-100" onClick={handleSendFeedback}>
        {t("send")}
      </button>
    </>
  );
}
