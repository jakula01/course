import API from "./axios";
import { toast } from "react-toastify";

export const getUsers = async () => {
  try {
    const { data } = await API.get("/users/get");
    return data;
  } catch (err) {
    toast.error(
      err.response?.data?.message || err.message || "Failed to load users"
    );
  }
};

export const updateUserStatus = async (ids, status) => {
  try {
    await API.post("/users/update-status", { ids, status });
    toast.success(status === "blocked" ? "Blocked" : "Unblocked");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        err.message ||
        "Failed to update user status"
    );
  }
};

export const deleteUsersByIds = async (ids) => {
  try {
    await API.post("/users/delete", { ids });
    toast.success("Deleted");
  } catch (err) {
    toast.error(
      err.response?.data?.message || err.message || "Failed to delete users"
    );
  }
};
