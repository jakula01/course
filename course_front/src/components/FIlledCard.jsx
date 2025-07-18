import { formatTimeAgo } from "../utility/timeAgoCalculator";
import { useTranslation } from "react-i18next";
export default function FilledCard({ form, onClick }) {
  const { t } = useTranslation();
  const timeAgo = formatTimeAgo(form.submitted_at, t);

  return (
    <div
      className="col-6 col-md-4 col-lg-3"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card h-100 shadow-sm border-primary">
        <div className="card-body">
          <h5 className="card-title">{form.title}</h5>
          <p className="card-text text-white-muted mb-1">
            <i className="bi bi-person "></i> {form.author || "-"}
          </p>
          <p className="card-text">
            <i className="bi bi-clock-history"></i> {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
}
