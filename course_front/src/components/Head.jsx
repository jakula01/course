import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Dropdown } from "react-bootstrap";
import AuthForm from "./AuthForm";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Head() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 sticky-top">
        <a className="navbar-brand fw-bold text-primary" href="/">
          <h2>Forms</h2>
        </a>
        <ThemeToggle />
        <LanguageSwitcher />
        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="border-0 bg-white d-inline-flex align-items-center"
                id="user-dropdown"
              >
                <div className="d-flex flex-column text-end me-2">
                  <span className="fw-bold">{user.username}</span>
                  <span
                    className="text-muted-white"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {user.email}
                  </span>
                </div>
                <i className="bi bi-person-circle fs-4 text-primary"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => navigate("/cabinet")}>
                  <i className="bi bi-person-lines-fill me-2"></i>
                  {t("myAccount")}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  {t("logout")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button variant="outline-primary" onClick={handleShow}>
              {t("login")}
            </Button>
          )}
        </div>
      </header>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        contentClassName="border-0 bg-transparent"
      >
        <Modal.Body>
          <AuthForm setUser={setUser} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
