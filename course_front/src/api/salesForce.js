import API from "./axios";

export async function saveProfile(form) {
  const response = await API.post("/salesForce/upsert-contact", {
    userData: form,
  });
  return response.data;
}

export async function getProfileByEmail(email) {
  const response = await API.get(
    `/salesForce/get-contact?email=${encodeURIComponent(email)}`
  );
  return response.data;
}
