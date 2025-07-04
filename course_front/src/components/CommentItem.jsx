import { formatTimeAgo } from "../utility/timeAgoCalculator";
import { useTranslation } from "react-i18next";
export default function CommentItem({ comment }) {
  const { t } = useTranslation();
  const timeAgo = formatTimeAgo(comment.created_at, t);

  return (
    <li
      className="d-flex border rounded shadow-sm "
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        borderColor: "rgba(29, 16, 16, 0.1)",
      }}
    >
      <div className="me-3 flex-shrink-0"></div>

      <div className="flex-grow-1 pe-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fw-semibold text-truncate">{comment.username}</span>
          <small className="text-muted ms-3 flex-shrink-0">{timeAgo}</small>
        </div>
        <p className="mb-0 text-break">{comment.message}</p>
      </div>
    </li>
  );
}
