import { useEffect, useState } from "react";
import { Button, Modal, Spinner, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getMyForms, deleteForm } from "../api/forms";
import TemplateCard from "./TemplateCard";
import EditTemplateForm from "./EditTemplateForm";

export default function MyTemplates() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [selected, setSelected] = useState(new Set());
  const isSelected = (id) => selected.has(id);

  const load = async () => {
    try {
      const data = await getMyForms();
      setTemplates(data.myForms);
      setSelected(new Set());
    } catch (e) {
      console.error(e);
      setError(t("failT"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selected.size === templates.length) setSelected(new Set());
    else setSelected(new Set(templates.map((t) => t.id)));
  };

  const deleteSelected = async () => {
    if (!window.confirm(t("areYouSureDelete"))) return;
    setLoading(true);
    try {
      await Promise.all([...selected].map((id) => deleteForm(id)));
    } catch (e) {
      console.error(e);
    } finally {
      load();
    }
  };

  if (loading) return <Spinner className="m-4" />;
  if (error) return <p className="text-danger m-4">{error}</p>;

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 text-primary">{t("myTemplates")}</h4>

        <div className="d-flex gap-3 align-items-center">
          <Form.Check
            type="checkbox"
            id="select-all"
            disabled={templates.length === 0}
            checked={
              templates.length !== 0 && selected.size === templates.length
            }
            onChange={toggleAll}
          />

          <Button
            variant="outline-danger"
            disabled={selected.size === 0}
            onClick={deleteSelected}
          >
            <i className="bi bi-trash me-1" />({selected.size})
          </Button>

          <Button variant="primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg me-1" /> {t("create")}
          </Button>
        </div>
      </div>

      {templates.length === 0 && (
        <p className="text-muted">{t("noTemplates")}</p>
      )}

      <div className="row g-3">
        {templates.map((tpl) => (
          <div key={tpl.id} className="col-6 col-md-6 col-lg-4">
            <TemplateCard
              template={tpl}
              isSelected={isSelected(tpl.id)}
              onSelect={() => toggle(tpl.id)}
              onClick={() => {
                navigate(`/template/${tpl.id}`, { state: tpl });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
