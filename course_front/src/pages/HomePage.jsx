import React, { useEffect, useState } from "react";
import { getAllForms } from "../api/forms";
import { Modal } from "react-bootstrap";
import FillTemplateForm from "../components/FIllTemplateForm";
import { useTranslation } from "react-i18next";
import FeedbackForm from "../components/FeedbackForm";
import TemplateCard from "../components/TemplateCard";
import Fuse from "fuse.js";
export default function HomePage() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchForms = async () => {
    try {
      const data = await getAllForms();

      setTemplates(data.allForms);
      setFilteredTemplates(data.allForms);
    } catch (err) {
      console.error("Ошибка при загрузке форм:", err);
      setError(t("failT"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTemplates(templates);
      return;
    }

    const fuse = new Fuse(templates, {
      keys: [
        "title",
        "author",
        "description",
        "int_question_1",
        "int_question_2",
        "int_question_3",
        "int_question_4",
        "single_text_question_1",
        "single_text_question_2",
        "single_text_question_3",
        "single_text_question_4",
        "mul_text_question_1",
        "mul_text_question_2",
        "mul_text_question_3",
        "mul_text_question_4",
        "checkbox_question_1",
        "checkbox_question_2",
        "checkbox_question_3",
        "checkbox_question_4",
      ],
      threshold: 0.3,
      ignoreLocation: true,
    });

    const result = fuse.search(searchQuery);
    setFilteredTemplates(result.map(({ item }) => item));
  }, [searchQuery, templates]);
  return (
    <div className="container py-4">
      <input
        type="text"
        placeholder={t("templSearch")}
        className="form-control mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h2 className="mb-4 text-primary">{t("allTemplates")}</h2>

      {loading && <p className="text-info">{t("loading")}</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && filteredTemplates.length === 0 && (
        <p className="text-muted">{t("noTemplates")}</p>
      )}

      <div className="row g-3">
        {filteredTemplates.map((tpl) => (
          <div key={tpl.id} className="col-6 col-md-4 col-lg-3">
            <TemplateCard
              template={tpl}
              onClick={() => {
                setSelectedTemplate(tpl);
                setShowModal(true);
              }}
              isTemplatePage={false}
            />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <FillTemplateForm
            template={selectedTemplate}
            onSubmitted={() => {
              setShowModal(false);
              setShowFeedback(true);
            }}
            isTemplatePage={false}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showFeedback} onHide={() => setShowFeedback(false)} centered>
        <Modal.Header closeButton>
          <h5 className="modal-title">{t("leaveFeedback")}</h5>
        </Modal.Header>
        <Modal.Body>
          <FeedbackForm
            template={selectedTemplate}
            onSend={() => setShowFeedback(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
