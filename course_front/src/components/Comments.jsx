import { useEffect, useState } from "react";
import { getComments } from "../api/feedback";
import { useTranslation } from "react-i18next";
import CommentItem from "./CommentItem";

export default function Comments({ id }) {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getComments(id);
        setComments(data);
      } catch (err) {
        console.error("Ошибка загрузки комментариев:", err);
      }
    })();
  }, [id]);

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title mb-3">{t("comments")}</h5>

        {comments.length === 0 ? (
          <p className="text-muted">{t("noCom")}</p>
        ) : (
          <ul className="list-unstyled">
            {comments.map((c) => (
              <CommentItem key={c.id} comment={c} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
