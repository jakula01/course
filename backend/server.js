const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const filledFormRoutes = require("./routes/filledFormRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRouets = require("./routes/userRoutes");
const saleForceRoutes = require("./routes/salesForceRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const odooRoutes = require("./routes/odooRoutes");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/salesForce", saleForceRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/filledForms", filledFormRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRouets);
app.use("/api/dropbox", ticketRoutes);
app.use("/api/odoo", odooRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
