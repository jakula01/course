import API from "./axios";

export async function createForm(formData) {
  const response = await API.post("/forms/create", formData);
  return response.data.form;
}

export async function getAllForms() {
  const response = await API.get("/forms");
  return response.data;
}

export async function getFormById(id) {
  const response = await API.get(`/forms/${id}`);
  return response.data;
}
export async function getMyForms() {
  const response = await API.get(`/forms/myForms`);
  return response.data;
}
export async function updateForm(formData, id) {
  const response = await API.put(`/forms/${id}`, { formData });

  return response.data.updatedForm;
}
export async function deleteForm(id) {
  const response = await API.delete(`/forms/${id}`);
  return response.data;
}
