import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(next);
  };

  return (
    <button className="btn btn-sm btn-outline-secondary" onClick={toggle}>
      {i18n.language === "ru" ? "EN" : "RU"}
    </button>
  );
}
