import API from "./axios";

export async function submitFIlledForm(id, formData) {
  console.log(formData, id);
  const response = await API.post(`/filledForms/${id}/fill`, formData);
  return response.data.form;
}

export async function getAllMyFilledForms() {
  const response = await API.get(`/filledForms/myFilledForms`);
  return response.data;
}

export async function getTemplateFilledForms(id) {}
