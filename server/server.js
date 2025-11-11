const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db_connection");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send({ message: "Hi elton" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    // await sequelize.sync({ alter: true });
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log("Server listening ", PORT);
    });
  } catch (err) {
    console.log("Failed to connect database");
    process.exit(1);
  }
};
start();
