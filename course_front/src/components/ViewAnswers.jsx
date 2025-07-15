import { useEffect, useState } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import { getAnswersOfForm } from "../api/filledForms";
import { formatTimeAgo } from "../utility/timeAgoCalculator";
import { useTranslation } from "react-i18next";
import { useTemplateTitle } from "./TemplateTitleProvider";
export default function ViewAnswers({ form }) {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const { setTemplateTitle } = useTemplateTitle();
  useEffect(() => {
    if (!form?.id) return;
    setTemplateTitle(form.title);
    setLoading(true);
    getAnswersOfForm(form.id)
      .then(setAnswers)
      .catch(() => setError(t("failF")))
      .finally(() => setLoading(false));
    return () => {
      setTemplateTitle(null);
    };
  }, [form?.id, t]);

  if (loading)
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    );
  if (error) return <p className="text-danger">{error}</p>;
  if (answers.length === 0)
    return <p className="text-muted">{t("noFilled")}</p>;

  return (
    <>
      <ul className="list-group">
        {answers.map((a) => (
          <li
            key={a.id}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setSelected(a)}
          >
            <div className="text-truncate" style={{ maxWidth: "70%" }}>
              <strong>{a.user_email}</strong>
              <span className="ms-2 text-muted small">
                {formatTimeAgo(a.submitted_at, t)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        show={!!selected}
        onHide={() => setSelected(null)}
        centered
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selected && <AnswerDetail form={form} answer={selected} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function AnswerDetail({ form, answer }) {
  const renderBlock = (type) => {
    const items = [];
    for (let i = 1; i <= 4; i++) {
      if (!form[`${type}_state_${i}`]) continue;
      const q = form[`${type}_question_${i}`];
      const a = answer[`${type}_answer_${i}`];
      items.push(
        <div key={`${type}_${i}`} className="mb-2">
          <strong>{q}</strong>
          <div className="ms-2">{String(a ?? "—")}</div>
        </div>
      );
    }
    return items.length ? <div className="mb-3">{items}</div> : null;
  };

  const { t } = useTranslation();
  return (
    <>
      <h4>
        {t("answerFrom")}
        {answer.user_email}
      </h4>
      {renderBlock("int")}
      {renderBlock("checkbox")}
      {renderBlock("single_text")}
      {renderBlock("mul_text")}
    </>
  );
}
