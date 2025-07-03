import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { loginUser, registerUser } from "../api/auth";
import { useTranslation } from "react-i18next";
export default function AuthForm({ setUser, handleClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (!isLogin && password !== confirmPassword) {
      const err = t("dontmatch");
      setError(err);
      return;
    }

    try {
      const res = isLogin
        ? await loginUser({ email, password })
        : await registerUser({ username, email, password });

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setUser(res.user);
      handleClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow p-4">
      <h4 className="text-center mb-3">
        {isLogin ? t("login") : t("registration")}
      </h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("username")}
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("email")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("password")}
            required
          />
        </Form.Group>

        {!isLogin && (
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t("confirm")}
              required
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" className="w-100">
          {isLogin ? t("logining") : t("register")}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Button variant="link" onClick={toggleForm}>
          {isLogin ? t("dontHave") : t("alrHave")}
        </Button>
      </div>
    </Card>
  );
}
