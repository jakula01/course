import API from "./axios";

export async function sendComment(formId, message) {
  if (formId && message)
    await API.post("/feedback/comment", { formId, message });
}

export async function sendLike(formId) {
  await API.put("/feedback/like", { formId });
}
export async function getComments(id) {
  const response = await API.get(`/feedback/${id}`);
  return response.data.comments;
}
