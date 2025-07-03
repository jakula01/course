import { useState } from "react";
import MyTemplates from "../components/MyTemplates";
import MyFilledForms from "../components/MyFilledForms";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
export default function CabinetPage() {
  const [activeTab, setActiveTab] = useState("templates");
  const { t } = useTranslation();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 mb-3">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column gap-2">
              <button
                className={`btn text-start ${
                  activeTab === "templates"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("templates")}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                {t("myTemplates")}
              </button>
              <button
                className={`btn text-start ${
                  activeTab === "filled" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("filled")}
              >
                <i className="bi bi-journal-check me-2"></i>
                {t("myFilled")}
              </button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-9">
          <Card className="shadow-sm">
            <Card.Body>
              {activeTab === "templates" ? <MyTemplates /> : <MyFilledForms />}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
