const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
 cors: {
   origin: "*",
   methods: ["GET", "POST"],
 },
});

app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/api/status", (req, res) => {
 res.json({
   status: "active",
   message: "Coeful WebRTC Signaling Server",
   version: "1.0.0",
 });
});

app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Socket.io Handlers
io.on("connection", (socket) => {
 socket.emit("me", socket.id);

 socket.on("disconnect", () => {
   socket.broadcast.emit("callEnded");
 });

 socket.on("callUser", ({ userToCall, signalData, from, name }) => {
   io.to(userToCall).emit("callUser", { signal: signalData, from, name });
 });

 socket.on("answerCall", (data) => {
   io.to(data.to).emit("callAccepted", data.signal);
 });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

