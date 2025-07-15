import React, { useState, useEffect } from "react";
import { saveProfile, getProfileByEmail } from "../api/salesForce";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
export default function SalesforceProfileForm() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
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
              toast.success(t("DataLoaded"));
            } else {
              toast.success(t("haventFilled"));
            }
          })
          .catch(() => toast.error(t("errLoad")));
      } catch {
        toast.error(t("errRead"));
      }
    } else {
      toast.error(t("isntAuth"));
    }
  }, [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProfile(form);
      toast.success(t("success"));
    } catch {
      toast.error(t("failT"));
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
    </div>
  );
}
