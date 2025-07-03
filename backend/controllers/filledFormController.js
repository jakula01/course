const {
  saveFilledForm,
  getAllMyFilledForms,
} = require("../models/filledFormModel");

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
module.exports = { submitFilledForm, getMyFilledForms };
