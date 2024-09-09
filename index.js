const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: process.env.URL_FRONT,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.URL_FRONT,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});

let activeSessions = 0;

const url = process.env.URL_DB;
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    const db = client.db("db-orders-products");
    const collection = db.collection("orders-products");

    app.get("/items", async (req, res) => {
      try {
        const items = await collection.find({}).toArray();
        res.json(items);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.delete("/items/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await collection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 1) {
          res.status(200).send(`Item with id ${id} was deleted`);
        } else {
          res.status(404).send("Item not found");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send("Internal Server Error");
      }
    });

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
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
