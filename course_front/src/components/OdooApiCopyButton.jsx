import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { fetchApiToken } from "../api/apiToken";

export default function OdooApiCopyButton() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [copyPos, setCopyPos] = useState({ x: 0, y: 0 });
  const [apiToken, setApiToken] = useState(null);

  const handleCopy = (e) => {
    if (!apiToken) {
      toast.error(t("apiTokenMissing"));
      return;
    }

    navigator.clipboard.writeText(apiToken).then(() => {
      setCopyPos({ x: e.clientX, y: e.clientY });
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    async function loadToken() {
      try {
        const data = await fetchApiToken();
        if (data) setApiToken(data);
      } catch (error) {
        console.error(error);
        toast.error(t("apiTokenLoadError"));
      }
    }
    loadToken();
  }, []);

  return (
    <>
      <button
        onClick={handleCopy}
        title={t("copyToken")}
        className="btn btn-outline-secondary btn-sm me-2"
        type="button"
      >
        <i className="bi bi-clipboard"></i>
      </button>

      {copied && (
        <div
          style={{
            position: "fixed",
            top: copyPos.y + 15,
            left: copyPos.x + 15,
            backgroundColor: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 9999,
            opacity: 0.9,
            transition: "opacity 0.3s",
          }}
        >
          {t("copied")}
        </div>
      )}
    </>
  );
}
