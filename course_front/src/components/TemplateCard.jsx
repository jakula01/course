import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
export default function TemplateCard({
  template,
  isSelected,
  onSelect,
  onClick,
}) {
  const { t } = useTranslation();

  return (
    <div
      role="button"
      onClick={onClick}
      className="d-flex flex-column justify-content-between rounded shadow-sm bg-c position-relative"
      style={{
        cursor: "pointer",
        height: "340px",
        padding: "15px",
        borderTop: "4px solid rgb(226, 226, 226)",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {onSelect && (
        <Form.Check
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="position-absolute"
          style={{
            top: "10px",
            right: "10px",
            zIndex: 10,
            borderRadius: "4px",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div>
        <h5
          className="text-primary fw-semibold mb-1 text-truncate"
          title={template.title}
          style={{ whiteSpace: "nowrap" }}
        >
          {template.title}
        </h5>

        {template.description?.trim() && (
          <p
            className="text-black small mb-2"
            style={{
              height: "55px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
            title={template.description}
          >
            {template.description}
          </p>
        )}
      </div>

      <div
        className="mb-3 rounded bg-g"
        style={{
          height: "120px",
          backgroundColor: "#e9ecef",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {template.image ? (
          <img
            src={template.image}
            alt={template.title}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="text-secondary d-flex flex-column align-items-center text-black">
            <i className="bi bi-image fs-1 mb-2"></i>
            <span style={{ fontSize: "0.85rem" }}>{t("noImg")}</span>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
        <small
          className="text-muted d-flex align-items-center"
          style={{ maxWidth: "70%" }}
        >
          <i className="bi bi-person-fill me-2 text-info"></i>
          <span className="text-black">{template.author}</span>
        </small>
        <small className="text-muted d-flex align-items-center">
          <i className="bi bi-chat-left-text me-1"></i>
          {template.comments ?? 0}
        </small>
        <small className="text-danger d-flex align-items-center">
          <i className="bi bi-heart-fill me-1"></i>
          {template.likes ?? 0}
        </small>
      </div>
    </div>
  );
}
