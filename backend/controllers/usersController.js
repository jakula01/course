const {
  getAllUsers,
  deleteUsersByIds,
  updateUsersStatus,
} = require("../models/usersModel");

async function fetchUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Userlist server error" });
  }
}

async function deleteUsers(req, res) {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "User IDs for deletion have not been transferred" });
  }

  try {
    await deleteUsersByIds(ids);
    res.status(200).json({ message: "Users deleted" });
  } catch (err) {
    console.error("Error when deleting users:", err);
    res.status(500).json({ error: "Server error when deleting users" });
  }
}

async function updateStatus(req, res) {
  const { ids, status } = req.body;

  if (
    !Array.isArray(ids) ||
    ids.length === 0 ||
    !["active", "blocked"].includes(status)
  ) {
    return res.status(400).json({ error: "Incorrect data for status update" });
  }

  try {
    await updateUsersStatus(ids, status);
    res.status(200).json({ message: "The status of users has been updated" });
  } catch (err) {
    console.error("Error when updating user status:", err);
    res.status(500).json({ error: "Server error during status update" });
  }
}

module.exports = {
  fetchUsers,
  deleteUsers,
  updateStatus,
};
