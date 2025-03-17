const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");
const { join } = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
server.listen(9000, () => console.log("Server is running on port 9000"));
