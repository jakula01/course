import { useEffect, useState } from "react";
import { getMyForms } from "../api/forms";
import { Button, Modal } from "react-bootstrap";
import EditTemplateForm from "./EditTemplateForm";
import { useTranslation } from "react-i18next";
import TemplateCard from "./TemplateCard";
import { useNavigate } from "react-router-dom";
export default function MyTemplates() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [myTemplates, setMyTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMyForms = async () => {
    try {
      const data = await getMyForms();
      setMyTemplates(data.myForms);
    } catch (err) {
      console.error(err);
      setError(t("failT"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyForms();
  }, []);

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 text-primary">{t("myTemplates")}</h4>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-lg me-1" /> {t("create")}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setLoading(true);
              fetchMyForms();
            }}
          >
            <i className="bi bi-arrow-clockwise me-1" /> {t("refresh")}
          </Button>
        </div>
      </div>

      {loading && <p className="text-info">{t("loading")}</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && myTemplates.length === 0 && (
        <p className="text-muted">{t("noTemplates")}</p>
      )}

      <div className="row g-3">
        {myTemplates.map((tpl) => (
          <div key={tpl.id} className="col-6 col-md-4 col-lg-3">
            <TemplateCard
              template={tpl}
              onClick={() => {
                setShowModal(true);
                navigate(`/template/${tpl.id}`, { state: tpl });
              }}
            />
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          fetchMyForms();
        }}
        centered
      >
        <Modal.Body className="p-0">
          <EditTemplateForm
            onCreated={() => {
              setShowModal(false);
              fetchMyForms();
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
