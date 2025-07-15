const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return token;
};

function generateApiToken() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = { createToken, generateApiToken };
