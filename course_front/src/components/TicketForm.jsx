import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import { useTemplateTitle } from "./TemplateTitleProvider";
import { sendTicket } from "../api/sendTicket";
import { toast } from "react-toastify";
export default function TicketForm({ show, setHelpModal, user }) {
  const { t } = useTranslation();
  const { templateTitle } = useTemplateTitle();
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState(t("high"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticket = {
      summary,
      priority,
      "Reported by": user.email,
      Template: templateTitle || "No template title",
      Link: window.location.href,
    };
    try {
      await sendTicket(ticket);
      toast.success(t("ticketSuccess"));
    } catch (err) {
      toast.error(alert(t("failT")));
    }
    onClose();
  };
  const onClose = () => {
    setSummary("");
    setHelpModal(false);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("ticket")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>{t("priority")}</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">{t("high")}</option>
              <option value="Low">{t("low")}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>{t("description")}</Form.Label>
            <Form.Control
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={t("describeIssue")}
              autoFocus
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          disabled={!summary.trim()}
        >
          {t("submit")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
