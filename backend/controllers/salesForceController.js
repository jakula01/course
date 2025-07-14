const salesforce = require("../salesForce");

const upsertContact = async (req, res) => {
  const { name, company, email, phone } = req.body.userData;
  try {
    const result = await salesforce.upsertContact({
      name,
      email,
      phone,
      company,
    });
    res.json(result);
  } catch (err) {
    console.error("Salesforce error:", err.response?.data || err.message);
    res.status(500).json({ error: "Ошибка Salesforce", details: err.message });
  }
};

const getContactByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const result = await salesforce.getContactByEmail(email);

    res.json(result);
  } catch (err) {
    console.error("Salesforce fetch error:", err.response?.data || err.message);
    res.status(500).json({ error: "Не удалось получить контакт" });
  }
};

module.exports = { upsertContact, getContactByEmail };
