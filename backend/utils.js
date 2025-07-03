const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return token;
};
module.exports = { createToken };
