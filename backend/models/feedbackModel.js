const db = require("../db");

async function addComment(formId, username, message) {
  const result = await db.query(
    `INSERT INTO comments (form_id, username, message)
     VALUES ($1, $2, $3) RETURNING *`,
    [formId, username, message]
  );
  return result.rows[0];
}

async function addLike(formId) {
  await db.query(`UPDATE forms SET likes = likes + 1 WHERE id = $1`, [formId]);
}

async function getAllComments(formId) {
  const result = await db.query("SELECT * from comments WHERE form_id = $1", [
    formId,
  ]);
  return result.rows;
}

module.exports = { addComment, addLike, getAllComments };
