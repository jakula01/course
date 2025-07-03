import React, { useEffect, useState } from "react";
import { getAllForms } from "../api/forms";
import { Modal } from "react-bootstrap";
import FillTemplateForm from "../components/FIllTemplateForm";
import { useTranslation } from "react-i18next";
import FeedbackForm from "../components/FeedbackForm";
import TemplateCard from "../components/TemplateCard";
export default function HomePage() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const fetchMyForms = async () => {
    try {
      const data = await getAllForms();
      setTemplates(data.allForms);
    } catch (err) {
      console.error("Ошибка при загрузке форм:", err);
      setError(t("failT"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyForms();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">{t("allTemplates")}</h2>

      {loading && <p className="text-info">{t("loading")}</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && templates.length === 0 && (
        <p className="text-muted">{t("noTemplates")}</p>
      )}

      <div className="row g-3">
        {templates.map((tpl) => (
          <div key={tpl.id} className="col-6 col-md-4 col-lg-3">
            <TemplateCard
              template={tpl}
              onClick={() => {
                setSelectedTemplate(tpl);
                setShowModal(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* Модалка заполнения */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <FillTemplateForm
            template={selectedTemplate}
            onSubmitted={() => {
              setShowModal(false);
              setShowFeedback(true);
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Модалка фидбэка */}
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
