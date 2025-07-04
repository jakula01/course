import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner, Button, Nav } from "react-bootstrap";
import { getFormById } from "../api/forms";
import EditTemplateForm from "../components/EditTemplateForm";
import FillTemplateForm from "../components/FIllTemplateForm";
import { useTranslation } from "react-i18next";
import ViewAnswers from "../components/ViewAnswers";

function TemplateAnswers() {
  return <p className="text-muted">Coming&nbsp;soon…</p>;
}

export default function ViewTemplatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: initialForm } = useLocation();
  const { t } = useTranslation();

  const [form, setForm] = useState(initialForm || null);
  const [loading, setLoading] = useState(!initialForm);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("view");
  const handleSaved = (updated) => {
    setForm(updated);
    setActiveTab("view");
  };

  useEffect(() => {
    if (form) return;
    (async () => {
      try {
        const data = await getFormById(id);
        setForm(data);
      } catch (err) {
        console.error("Error loading form:", err);
        setError(t("failT"));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, form, t]);

  const renderContent = () => {
    if (!form) return null;
    switch (activeTab) {
      case "view":
        return <FillTemplateForm template={form} canSend={false} />;
      case "edit":
        return <EditTemplateForm template={form} onCreated={handleSaved} />;
      case "answers":
        return <ViewAnswers form={form} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 align-items-center justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="d-flex vh-100 align-items-center justify-content-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }
  return (
    <div className="container-fluid py-4">
      <Button variant="link" onClick={() => navigate(-1)} className="mb-3">
        <i className="bi bi-arrow-left" /> {t("back")}
      </Button>

      <div className="row">
        {/* ▸ Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 mb-3 mb-md-0">
          <Nav className="flex-column nav-pills bg-light rounded p-3 shadow-sm">
            <Nav.Link
              active={activeTab === "view"}
              onClick={() => setActiveTab("view")}
            >
              <i className="bi bi-eye me-2" /> {t("viewTemplate")}
            </Nav.Link>
            <Nav.Link
              active={activeTab === "edit"}
              onClick={() => setActiveTab("edit")}
            >
              <i className="bi bi-pencil-square me-2" /> {t("editTemplate")}
            </Nav.Link>
            <Nav.Link
              active={activeTab === "answers"}
              onClick={() => setActiveTab("answers")}
            >
              <i className="bi bi-chat-left-text me-2" /> {t("viewAnswers")}
            </Nav.Link>
          </Nav>
        </div>

        <div className="col-12 col-md-9 col-lg-10">{renderContent()}</div>
      </div>
    </div>
  );
}
