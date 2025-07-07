const bcrypt = require("bcrypt");
const { createToken } = require("../utils");
const { findUserByEmail, createUser } = require("../models/userModel");
const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body, username, email, password);
  try {
    const existingUser = await findUserByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account with this e-mail already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    const token = createToken(user);
    const data = { username: user.username, email: user.email };

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
    const token = createToken(user);
    const data = { username: user.username, email: user.email };
    res.json({ token, user: data });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
