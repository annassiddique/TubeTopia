// Importing necessary modules and initializing configuration for the server
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");
const http = require("http");
const { Server } = require("socket.io");

// Importing route handlers for user authentication, video management, and voting functionality
const authRoutes = require("./src/routes/userRoutes");
const videoRoutes = require("./src/routes/videoRoutes");
const voteRoutes = require("./src/routes/voteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Setting up an HTTP server and integrating Socket.IO for real-time communication
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "https://tube-topia.surge.sh", // Allowing frontend requests from this origin
    origin: "http://localhost:5173", // Allowing frontend requests from this origin
  },
});

// Connect to the database
connectDB();

// Middleware for CORS and JSON request parsing
// app.use(cors({ origin: "https://tube-topia.surge.sh" }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Handling Socket.IO connections for real-time features
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
});

// Base route to confirm server status
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Setting up API routes for user authentication, video management, and voting
app.use("/api/user", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/votes", voteRoutes(io));

// Starting the server and listening on the specified port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
