import React, { useState, useEffect } from "react";
import { saveProfile, getProfileByEmail } from "../api/salesForce";
import { useTranslation } from "react-i18next";
export default function SalesforceProfileForm() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(storedUser);
        setUser(parsedUser);

        setForm((prev) => ({
          ...prev,
          email: parsedUser.email || "",
        }));

        getProfileByEmail(parsedUser.email)
          .then((data) => {
            if (data) {
              setForm({
                name: data.LastName || "",
                company: data.Account.Name || "",
                email: parsedUser.email || "",
                phone: data.Phone || "",
              });
              setStatus(t("DataLoaded"));
            } else {
              setStatus(t("haventFilled"));
            }
          })
          .catch(() => setError(t("errLoad")));
      } catch {
        setError(t("errRead"));
      }
    } else {
      setError(t("isntAuth"));
    }
  }, [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await saveProfile(form);
      setStatus(t("success"));
    } catch {
      setError(t("failT"));
    }
  };

  if (!user) return <p>{t("loading")}</p>;

  return (
    <div className="container py-4">
      <h2>{t("profile")}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder={t("FIO")}
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder={t("company")}
          className="form-control mb-2"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder={t("email")}
          className="form-control mb-2"
          value={form.email}
          disabled
          readOnly
        />
        <input
          name="phone"
          placeholder={t("phone")}
          className="form-control mb-2"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          {t("submit")}
        </button>
      </form>

      {status && <div className="alert alert-success mt-3">{status}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
