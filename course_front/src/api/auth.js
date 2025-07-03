import API from "./axios";

function saveUserDataToLocalStorage(token, userData) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
}

export async function registerUser(data) {
  try {
    const response = await API.post("/auth/register", data);
    const { token, user } = response.data;
    saveUserDataToLocalStorage(token, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
}

export async function loginUser(data) {
  try {
    const response = await API.post("/auth/login", data);
    const { token, user } = response.data;
    saveUserDataToLocalStorage(token, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
}
