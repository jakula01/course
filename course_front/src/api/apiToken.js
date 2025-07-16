import API from "./axios";

export async function fetchApiToken() {
  try {
    const response = await API.get("/odoo/apiToken");
    return response.data.api_token;
  } catch (error) {
    console.error("Ошибка при получении API токена:", error);
    throw error;
  }
}
