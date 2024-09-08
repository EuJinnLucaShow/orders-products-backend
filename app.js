const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://spa-application-orders-products.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
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

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
