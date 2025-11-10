const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send({ message: "Hi elton" });
});

const start = () => {
  app.listen(PORT, () => {
    console.log("Listening ", PORT);
  });
};
start();
