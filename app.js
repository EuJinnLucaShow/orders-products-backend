const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD-MM-YYYY hh:mm:ss a");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${data}`);
  next();
});

app.get("/", (req, res) => {
  res.json([]);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(3000, () => console.log("Server running"));
