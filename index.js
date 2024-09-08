const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://spa-application-orders-products.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

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

io.use(async (socket, next) => {
  const { method, url } = socket.request;
  const data = moment().format("DD-MM-YYYY hh:mm:ss a");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${data}`);
  next();
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
