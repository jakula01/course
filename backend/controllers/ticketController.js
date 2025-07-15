const { uploadJsonToDropbox } = require("../dropbox");

const uploadTicket = async (req, res, next) => {
  try {
    const { fileName, json } = req.body;
    if (!fileName || !json) {
      return res.status(400).json({ message: "fileName and json required" });
    }
    await uploadJsonToDropbox(fileName, json);
    res.status(200).json({ ok: true });
  } catch (err) {
    next(err);
  }
};
module.exports = { uploadTicket };
