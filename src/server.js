
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// A normal HTTP route to check that the server works.
app.get("/health", (req, res) => {
  res.json({ message: "Chat server is running!" });
});

// Create the Socket.IO server.
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Our first Socket.IO event listener.
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
