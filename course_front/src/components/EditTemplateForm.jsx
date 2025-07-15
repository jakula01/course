import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { createForm, updateForm } from "../api/forms";
import { useTranslation } from "react-i18next";
import { useTemplateTitle } from "./TemplateTitleProvider";

export default function EditTemplateForm({ template = {}, onCreated }) {
  const { setTemplateTitle } = useTemplateTitle();

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ...generateInitialFields("int"),
    ...generateInitialFields("checkbox"),
    ...generateInitialFields("single_text"),
    ...generateInitialFields("mul_text"),
  });

  useEffect(() => {
    if (template && template.id) {
      setTemplateTitle(template.title);
      setFormData({
        title: template.title || "",
        description: template.description || "",
        ...generateInitialFields("int", template),
        ...generateInitialFields("checkbox", template),
        ...generateInitialFields("single_text", template),
        ...generateInitialFields("mul_text", template),
      });
      return () => {
        setTemplateTitle(null);
      };
    }
  }, [template]);

  function generateInitialFields(type, source = {}) {
    const fields = {};
    for (let i = 1; i <= 4; i++) {
      fields[`${type}_question_${i}`] = source[`${type}_question_${i}`] || "";
      fields[`${type}_state_${i}`] = source[`${type}_state_${i}`] || false;
    }
    return fields;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let saved;
      if (template && template.id) {
        saved = await updateForm(formData, template.id);
      } else {
        await createForm(formData);
      }
      if (onCreated) onCreated();
    } catch (err) {
      console.error("Ошибка при сохранении формы:", err);
    }
  };

  const renderQuestionFields = (type, label) => (
    <div className="mb-4">
      <h6>{label}</h6>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={`${type}_${i}`}
          className="d-flex align-items-center mb-2 gap-2"
        >
          <Form.Check
            type="checkbox"
            name={`${type}_state_${i}`}
            checked={formData[`${type}_state_${i}`]}
            onChange={handleChange}
            label={``}
          />
          <Form.Control
            type="text"
            name={`${type}_question_${i}`}
            placeholder={`${t("question")} ${i}`}
            value={formData[`${type}_question_${i}`]}
            onChange={handleChange}
            disabled={!formData[`${type}_state_${i}`]}
          />
        </div>
      ))}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow-sm">
      <Form.Group className="mb-3">
        <Form.Label>{t("title")}</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("description")}</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      {renderQuestionFields("int", t("numeric"))}
      {renderQuestionFields("checkbox", t("checkbox"))}
      {renderQuestionFields("single_text", t("single"))}
      {renderQuestionFields("mul_text", t("multi"))}

      <div className="text-end">
        <Button variant="primary" type="submit">
          {t("save")}
        </Button>
      </div>
    </Form>
  );
}
