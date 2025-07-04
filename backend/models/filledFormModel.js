const db = require("../db");

async function saveFilledForm(formId, userEmail, formData) {
  const query = `
    INSERT INTO filled_forms (
      form_id, user_email,
      int_answer_1, int_answer_2, int_answer_3, int_answer_4,
      checkbox_answer_1, checkbox_answer_2, checkbox_answer_3, checkbox_answer_4,
      single_text_answer_1, single_text_answer_2, single_text_answer_3, single_text_answer_4,
      mul_text_answer_1, mul_text_answer_2, mul_text_answer_3, mul_text_answer_4
    ) VALUES (
      $1, $2, $3, $4,
      $5, $6, $7, $8,
      $9, $10, $11, $12,
      $13, $14, $15, $16,
      $17, $18
    )
    RETURNING *;
  `;

  const values = [
    formId,
    userEmail,

    formData.int_answer_1 ?? null,
    formData.int_answer_2 ?? null,
    formData.int_answer_3 ?? null,
    formData.int_answer_4 ?? null,

    formData.checkbox_answer_1 ?? null,
    formData.checkbox_answer_2 ?? null,
    formData.checkbox_answer_3 ?? null,
    formData.checkbox_answer_4 ?? null,

    formData.single_text_answer_1 ?? null,
    formData.single_text_answer_2 ?? null,
    formData.single_text_answer_3 ?? null,
    formData.single_text_answer_4 ?? null,

    formData.mul_text_answer_1 ?? null,
    formData.mul_text_answer_2 ?? null,
    formData.mul_text_answer_3 ?? null,
    formData.mul_text_answer_4 ?? null,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
}

async function getAllMyFilledForms(userEmail) {
  const result = await db.query(
    `
    SELECT 
      ff.*,
      f.title,
      f.description,
      f.author,
      f.int_question_1, f.int_state_1,
      f.int_question_2, f.int_state_2,
      f.int_question_3, f.int_state_3,
      f.int_question_4, f.int_state_4,

      f.checkbox_question_1, f.checkbox_state_1,
      f.checkbox_question_2, f.checkbox_state_2,
      f.checkbox_question_3, f.checkbox_state_3,
      f.checkbox_question_4, f.checkbox_state_4,

      f.single_text_question_1, f.single_text_state_1,
      f.single_text_question_2, f.single_text_state_2,
      f.single_text_question_3, f.single_text_state_3,
      f.single_text_question_4, f.single_text_state_4,

      f.mul_text_question_1, f.mul_text_state_1,
      f.mul_text_question_2, f.mul_text_state_2,
      f.mul_text_question_3, f.mul_text_state_3,
      f.mul_text_question_4, f.mul_text_state_4

    FROM filled_forms ff
    JOIN forms f ON f.id = ff.form_id
    WHERE ff.user_email = $1
    `,
    [userEmail]
  );

  return result.rows;
}
async function getFilledByFormId(formId) {
  const query = `
    SELECT *
    FROM   filled_forms
    WHERE  form_id = $1
    ORDER  BY submitted_at DESC          -- последние сверху
  `;
  const res = await db.query(query, [formId]);
  return res.rows;
}

module.exports = { saveFilledForm, getAllMyFilledForms, getFilledByFormId };
