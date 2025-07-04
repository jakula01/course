const {
  saveFilledForm,
  getAllMyFilledForms,
  getFilledByFormId,
} = require("../models/filledFormModel");
const db = require("../db");
const submitFilledForm = async (req, res) => {
  const formId = req.params.id;
  const userEmail = req.user?.email;
  const formData = req.body;

  try {
    const submission = await saveFilledForm(formId, userEmail, formData);
    res.status(201).json({ success: true, submission });
  } catch (err) {
    console.error("Ошибка при сохранении заполненной формы:", err);
    res.status(500).json({ error: "Не удалось сохранить заполнение формы" });
  }
};

const getMyFilledForms = async (req, res) => {
  const userEmail = req.user?.email;
  try {
    const forms = await getAllMyFilledForms(userEmail);
    res.status(201).json({ forms });
  } catch (err) {
    console.error("Ошибка при сохранении заполненной формы:", err);
    res.status(500).json({ error: "Не удалось сохранить заполнение формы" });
  }
};

async function getFilledByFormHandler(req, res) {
  const formId = req.params.id;
  const userEmail = req.user?.email;
  try {
    const owner = await db.query(
      "SELECT 1 FROM forms WHERE id = $1 AND author = $2",
      [formId, userEmail]
    );
    if (owner.rowCount === 0) {
      return res.status(403).json({ error: "Not your form" });
    }
    const answers = await getFilledByFormId(formId);
    res.json({ answers });
  } catch (err) {
    console.error("Error loading filled forms:", err);
    res.status(500).json({ error: "Failed to load answers" });
  }
}
module.exports = { submitFilledForm, getMyFilledForms, getFilledByFormHandler };
