const bcrypt = require("bcrypt");
const { createToken } = require("../utils");
const { findUserByEmail, createUser } = require("../models/userModel");
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account with this e-mail already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword, role);
    const token = createToken(user);
    const data = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json({ token, user: data });
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });
    if (user.status === "blocked")
      return res.status(401).json({ error: "User blocked" });
    const token = createToken(user);
    const data = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    res.json({ token, user: data });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
