const {
  createForm,
  deleteFormById,
  getAllForms,
  getAllMyForms,
  getFormById,
  updateForm,
} = require("../models/formModel");

const createFormHandler = async (req, res) => {
  try {
    const formData = req.body;
    const newForm = await createForm({ ...formData, author: req.user.email });
    res.status(201).json({ form: newForm });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: "Failed to create form" });
  }
};
const deleteFormByIdHandler = async (req, res) => {
  try {
    const deleted = await deleteFormById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Form not found" });
    res.status({ message: "Form deleted" });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: "Failed to create form" });
  }
};
const getAllFormsHandler = async (_req, res) => {
  try {
    const allForms = await getAllForms();
    res.json({ allForms });
  } catch (error) {
    console.error("Error getting all forms:", error);
    res.status(500).json({ error: "Failed to get all forms" });
  }
};
const getAllMyFormsHandler = async (req, res) => {
  try {
    const author = req.user.email;
    const myForms = await getAllMyForms(author);
    res.json({ myForms });
  } catch (err) {
    console.error("Error getting user's forms:", err);
    res.status(500).json({ error: "Failed to load your forms" });
  }
};
const getFormByIdHandler = async (req, res) => {
  try {
    const form = await getFormById(req.params.id);
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.json(form);
  } catch (error) {
    console.error("Error getting ur forms:", error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
};

const updateFormHandler = async (req, res) => {
  const { id } = req.params;

  const formData = req.body.formData;

  try {
    const updated = await updateForm(id, formData);
    res.status(200).json({ updatedForm: updated });
  } catch (error) {
    console.error("Ошибка при обновлении формы:", error);
    res.status(500).json({ error: "Ошибка при обновлении формы" });
  }
};
module.exports = {
  createFormHandler,
  deleteFormByIdHandler,
  getAllFormsHandler,
  getAllMyFormsHandler,
  getFormByIdHandler,
  updateFormHandler,
};
