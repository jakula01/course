const db = require("../db");
async function getMyFormsTitles(email) {
  const result = await db.query("SELECT id, title FROM forms WHERE author=$1", [
    email,
  ]);
  return result.rows;
}
module.exports = {
  getMyFormsTitles,
};
