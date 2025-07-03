import { useTimeAgo } from "../utility/timeAgoCalculator";

export default function CommentItem({ comment }) {
  const timeAgo = useTimeAgo(comment.created_at);

  return (
    <li className="d-flex mb-3 pb-3 border-bottom align-items-start">
      <div className="flex-shrink-0 me-3">
        <div
          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40 }}
        >
          <i className="bi bi-chat-dots" />
        </div>
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <span className="fw-semibold">{comment.user_email}</span>
          <small className="text-muted ms-2">{timeAgo}</small>
        </div>
        <p className="mb-0 text-wrap">{comment.message}</p>
      </div>
    </li>
  );
}
