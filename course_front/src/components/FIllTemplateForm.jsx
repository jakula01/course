import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { submitFIlledForm } from "../api/filledForms";
import { useTranslation } from "react-i18next";
import Comments from "./Comments";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function FillTemplateForm({
  template,
  onSubmitted,
  canSend = true,
  isTemplatePage = true,
}) {
  const [answers, setAnswers] = useState({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthor = user && user.email === template.author;
  const { t } = useTranslation();
  useEffect(() => {
    if (template && template.id) {
      const initialAnswers = {};
      ["int", "checkbox", "single_text", "mul_text"].forEach((type) => {
        for (let i = 1; i <= 4; i++) {
          if (template[`${type}_state_${i}`]) {
            initialAnswers[`${type}_answer_${i}`] =
              type === "checkbox" ? false : "";
          }
        }
      });
      setAnswers(initialAnswers);
    }
  }, [template]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFIlledForm(template.id, answers);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  const renderFields = (type, inputType = "text", isTextarea = false) => (
    <>
      {[1, 2, 3, 4].map((i) => {
        const show = template[`${type}_state_${i}`];
        const question = template[`${type}_question_${i}`];
        const name = `${type}_answer_${i}`;
        if (!show) return null;

        return (
          <Form.Group key={`${type}_field_${i}`} className="mb-2">
            <Form.Label>{question}</Form.Label>
            {type === "checkbox" ? (
              <Form.Check
                type="checkbox"
                name={name}
                checked={answers[name] || false}
                onChange={handleChange}
                disabled={!isAuthenticated}
              />
            ) : isTextarea ? (
              <Form.Control
                as="textarea"
                rows={3}
                name={name}
                value={answers[name] || ""}
                onChange={handleChange}
                disabled={!isAuthenticated}
              />
            ) : (
              <Form.Control
                type={inputType}
                name={name}
                value={answers[name] || ""}
                onChange={handleChange}
                disabled={!isAuthenticated}
              />
            )}
          </Form.Group>
        );
      })}
    </>
  );

  return (
    <>
      <Form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm">
        {isAuthor && !isTemplatePage && (
          <div className="d-flex justify-content-end gap-2 mb-3">
            <Button
              variant="outline-primary"
              size="sm"
              title={t("viewTemplate")}
              onClick={() =>
                navigate(`/template/${template.id}`, { state: template })
              }
            >
              <i className="bi bi-pencil-square"></i>
            </Button>
          </div>
        )}
        <h5 className="mb-3">
          {t("title")}: {template.title}
        </h5>
        <p>
          {t("description")}: {template?.description}
        </p>

        {renderFields("int", "number")}
        {renderFields("checkbox")}
        {renderFields("single_text", "text")}
        {renderFields("mul_text", "text", true)}

        {canSend && isAuthenticated ? (
          <div className="text-end mt-4">
            <Button variant="success" type="submit">
              {t("submit")}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Form>
      <Comments id={template.id} />
    </>
  );
}
