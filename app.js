const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");
const socketIo = require("socket.io");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);
const io = socketIo(server);

let activeSessions = 0;

io.on("connection", (socket) => {
  activeSessions++;
  console.log("New client connected");
  io.emit("sessionUpdate", activeSessions);

  socket.on("disconnect", () => {
    activeSessions--;
    console.log("Client disconnected");
    io.emit("sessionUpdate", activeSessions);
  });
});

app.use(cors());

app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD-MM-YYYY hh:mm:ss a");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${data}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
