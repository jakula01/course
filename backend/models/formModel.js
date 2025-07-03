const db = require("../db");

async function getAllForms() {
  const result = await db.query("SELECT * FROM forms ORDER BY id DESC");
  return result.rows;
}

async function getFormById(id) {
  const result = await db.query("SELECT * FROM forms WHERE id = $1", [id]);
  return result.rows[0];
}

async function getAllMyForms(author) {
  const result = await db.query(
    "SELECT * FROM forms WHERE author = $1 ORDER BY id DESC",
    [author]
  );
  return result.rows;
}
async function createForm({
  title,
  description,
  author,

  int_question_1,
  int_state_1,
  int_question_2,
  int_state_2,
  int_question_3,
  int_state_3,
  int_question_4,
  int_state_4,

  checkbox_question_1,
  checkbox_state_1,
  checkbox_question_2,
  checkbox_state_2,
  checkbox_question_3,
  checkbox_state_3,
  checkbox_question_4,
  checkbox_state_4,

  single_text_question_1,
  single_text_state_1,
  single_text_question_2,
  single_text_state_2,
  single_text_question_3,
  single_text_state_3,
  single_text_question_4,
  single_text_state_4,

  mul_text_question_1,
  mul_text_state_1,
  mul_text_question_2,
  mul_text_state_2,
  mul_text_question_3,
  mul_text_state_3,
  mul_text_question_4,
  mul_text_state_4,
}) {
  const result = await db.query(
    `
    INSERT INTO forms (
      title, description, author,
      int_question_1, int_state_1,
      int_question_2, int_state_2,
      int_question_3, int_state_3,
      int_question_4, int_state_4,
      checkbox_question_1, checkbox_state_1,
      checkbox_question_2, checkbox_state_2,
      checkbox_question_3, checkbox_state_3,
      checkbox_question_4, checkbox_state_4,
      single_text_question_1, single_text_state_1,
      single_text_question_2, single_text_state_2,
      single_text_question_3, single_text_state_3,
      single_text_question_4, single_text_state_4,
      mul_text_question_1, mul_text_state_1,
      mul_text_question_2, mul_text_state_2,
      mul_text_question_3, mul_text_state_3,
      mul_text_question_4, mul_text_state_4
    ) VALUES (
      $1, $2, $3,
      $4, $5, $6, $7, $8, $9, $10, $11,
      $12, $13, $14, $15, $16, $17, $18, $19,
      $20, $21, $22, $23, $24, $25, $26, $27,
      $28, $29, $30, $31, $32, $33, $34, $35
    )
    RETURNING *;
    `,
    [
      title,
      description,
      author,
      int_question_1,
      int_state_1,
      int_question_2,
      int_state_2,
      int_question_3,
      int_state_3,
      int_question_4,
      int_state_4,
      checkbox_question_1,
      checkbox_state_1,
      checkbox_question_2,
      checkbox_state_2,
      checkbox_question_3,
      checkbox_state_3,
      checkbox_question_4,
      checkbox_state_4,
      single_text_question_1,
      single_text_state_1,
      single_text_question_2,
      single_text_state_2,
      single_text_question_3,
      single_text_state_3,
      single_text_question_4,
      single_text_state_4,
      mul_text_question_1,
      mul_text_state_1,
      mul_text_question_2,
      mul_text_state_2,
      mul_text_question_3,
      mul_text_state_3,
      mul_text_question_4,
      mul_text_state_4,
    ]
  );

  return result.rows[0];
}
async function deleteFormById(id) {
  const result = await db.query("DELETE FROM forms WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
}
const updateForm = async (id, formData) => {
  const fields = Object.keys(formData);
  const values = Object.values(formData);

  const setClause = fields.map((key, i) => `"${key}" = $${i + 1}`).join(", ");

  const query = `
    UPDATE forms
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *
  `;

  const result = await db.query(query, [...values, id]);
  return result.rows[0];
};

module.exports = {
  updateForm,
};
module.exports = {
  createForm,
  deleteFormById,
  getAllForms,
  getAllMyForms,
  getFormById,
  updateForm,
};
