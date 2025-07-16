const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const { getMyFormsTitles } = require("../models/odooModels");
async function getApiToken(req, res) {
  try {
    const userId = req.user.id;
    const client = await db.connect();

    const result = await client.query(
      "SELECT api_token FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: "User not found" });
    }

    let apiToken = result.rows[0].api_token;
    if (!apiToken) {
      apiToken = uuidv4();
      await client.query("UPDATE users SET api_token = $1 WHERE id = $2", [
        apiToken,
        userId,
      ]);
    }

    client.release();
    return res.json({ api_token: apiToken });
  } catch (error) {
    console.error("Ошибка получения API токена:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getAgregated(req, res) {
  const result = [];
  const token = req.query.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ error: "token required" });

  const uRows = await db.query("SELECT email FROM users WHERE api_token=$1", [
    token,
  ]);

  if (uRows.length === 0) return res.status(401).json({ error: "bad token" });
  const author = uRows.rows[0];
  const templates = await getMyFormsTitles(author.email);

  for (const tpl of templates) {
    const tplJson = {
      title: tpl.title,
      author: author.email,
      questions: [],
    };

    const types = ["int", "checkbox", "single_text", "mul_text"];
    for (const type of types) {
      for (let i = 1; i <= 4; i++) {
        const qMeta = await db.query(
          `SELECT ${type}_state_${i} state, ${type}_question_${i} text
             FROM forms WHERE id=$1`,
          [tpl.id]
        );
        const q = qMeta.rows[0];
        if (!q || !q.state) continue;

        const answerCol = `${type}_answer_${i}`;
        const baseSql = `FROM filled_forms WHERE form_id=$1 AND ${answerCol} IS NOT NULL`;

        let agg;
        if (type === "int") {
          const { rows } = await db.query(
            `SELECT COUNT(*) count,
                    AVG(${answerCol}) avg,
                    MIN(${answerCol}) min,
                    MAX(${answerCol}) max
               ${baseSql}`,
            [tpl.id]
          );
          agg = rows[0];
        } else if (type === "checkbox") {
          const { rows } = await db.query(
            `SELECT SUM(CASE WHEN ${answerCol}=true  THEN 1 ELSE 0 END) AS true_count,
                    SUM(CASE WHEN ${answerCol}=false THEN 1 ELSE 0 END) AS false_count
               ${baseSql}`,
            [tpl.id]
          );
          agg = rows[0];
        } else {
          const { rows } = await db.query(
            `SELECT ${answerCol} AS answer, COUNT(*) AS cnt
               ${baseSql} GROUP BY ${answerCol}
               ORDER BY cnt DESC LIMIT 3`,
            [tpl.id]
          );
          agg = { popular_answers: rows };
        }

        tplJson.questions.push({
          text: q.text,
          question_type: type,
          ...agg,
        });
      }
    }

    result.push(tplJson);
  }
  console.log(result);
  res.json(result);
}
module.exports = {
  getApiToken,
  getAgregated,
};
