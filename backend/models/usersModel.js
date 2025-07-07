const db = require("../db");

async function getAllUsers() {
  const { rows } = await db.query(
    "SELECT id, username, email, status, created_at FROM users"
  );
  return rows;
}

async function deleteUsersByIds(ids) {
  await db.query("DELETE FROM users WHERE id = ANY($1)", [ids]);
}

async function updateUsersStatus(ids, status) {
  await db.query("UPDATE users SET status = $1 WHERE id = ANY($2)", [
    status,
    ids,
  ]);
}

module.exports = {
  getAllUsers,
  deleteUsersByIds,
  updateUsersStatus,
};
