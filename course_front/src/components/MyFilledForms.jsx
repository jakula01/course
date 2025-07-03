import { useEffect, useState } from "react";
import { getAllMyFilledForms } from "../api/filledForms";
import ViewFilledForm from "./ViewFilledForm";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FilledCard from "./FIlledCard";
export default function MyFilledForms() {
  const { t } = useTranslation();
  const [myFilledForms, setMyFilledForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getAllMyFilledForms();
        setMyFilledForms(data.forms);
      } catch (err) {
        console.error("Ошибка при загрузке filled форм:", err);
        setError(t("failF"));
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedForm(null);
  };

  const handleOpen = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h4 className="text-primary mb-3">{t("filled")}</h4>
      {loading && <p>{t("loading")}</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && myFilledForms.length === 0 && (
        <p className="text-muted">{t("noFilled")}</p>
      )}
      <div className="row g-3">
        {myFilledForms.map((form) => (
          <FilledCard
            key={form.id}
            form={form}
            onClick={() => {
              setSelectedForm(form);
              setShowModal(true);
            }}
          />
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        contentClassName="border-0 bg-transparent"
      >
        <Modal.Body>
          {selectedForm && <ViewFilledForm form={selectedForm} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}
