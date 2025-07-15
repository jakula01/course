import { useTranslation } from "react-i18next";
import { useTemplateTitle } from "./TemplateTitleProvider";
import { useEffect } from "react";
export default function ViewFilledForm({ form }) {
  const { t } = useTranslation();
  const { setTemplateTitle } = useTemplateTitle();

  const renderQA = (form, type) => {
    const questions = [];
    for (let i = 1; i <= 4; i++) {
      if (form[`${type}_state_${i}`]) {
        questions.push(
          <div key={`${type}_${i}`} className="mb-2">
            <strong>{form[`${type}_question_${i}`]}</strong>
            <div>
              {t("answer")}: {String(form[`${type}_answer_${i}`] ?? "—")}
            </div>
          </div>
        );
      }
    }
    return <div className="mb-3">{questions.length ? questions : <></>}</div>;
  };
  useEffect(() => {
    if (!form?.id) return;
    setTemplateTitle(form.title);
    return () => {
      setTemplateTitle(null);
    };
  }, [form?.id]);
  return (
    <ul className="bg-white p-3 rounded shadow-sm space-y-2">
      <div key={form.id} className="border rounded p-3 shadow-sm mb-4">
        {renderQA(form, "int")}
        {renderQA(form, "checkbox")}
        {renderQA(form, "single_text")}
        {renderQA(form, "mul_text")}
      </div>
    </ul>
  );
}
