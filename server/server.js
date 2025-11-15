const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db_connection");

const userRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    try {
      await sequelize.sync({ alter: true });
      console.log("Models synced");
    } catch (syncError) {
      console.log("Model sync failed:", syncError.message);
      console.log("Continuing with server start despite sync errors...");
    }
    app.listen(PORT, () => {
      console.log("Server listening ", PORT);
    });
  } catch (err) {
    console.log("Failed to connect database");
    process.exit(1);
  }
};
start();
