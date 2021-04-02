const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { rooms, addToRoom } = require("./rooms");
const PORT = process.env.PORT || 5000;

const clients = [];

// - Socket.io - //
io.sockets.on("connection", (socket) => {
  /* joins the user to a specific room */
  socket.on("sign-in", (room) => {
    addToRoom(room.room);
    clients.push(socket);
    socket.join(room.room);
    io.sockets.in(room.room).emit("message", {
      id: "admin",
      message: "A new user has join the chat.",
    });
  });

  /* receives message from client and sends it to everyone in the room */
  socket.on("message", ({ id, message, room, username }) => {
    io.sockets.in(room).emit("message", { id, message, username });
  });

  /* socket disconnect */
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// - Routes - //
app.get("/", (req, res) => {
  res.send("hello world");
});

http.listen(PORT, () => console.log("running on port 5000"));
