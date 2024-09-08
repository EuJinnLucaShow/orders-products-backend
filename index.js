const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://spa-application-orders-products.vercel.app/",
    credentials: true,
  },  
});

let activeSessions = 0;

io.on("connection", (socket) => {
  activeSessions++;  
  io.emit("sessionUpdate", activeSessions);

  socket.on("disconnect", () => {
    activeSessions--;    
    io.emit("sessionUpdate", activeSessions);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
