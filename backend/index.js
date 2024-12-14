const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db"); 
const http = require('http');
const socketIo = require('socket.io');

//routes
const authRoutes = require("./src/routes/userRoutes");
const videoRoutes = require("./src/routes/videoRoutes");
const voteRoutes = require("./src/routes/voteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server);


connectDB();


app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
  res.send("Server is up and running!");
});


app.use("/api/user", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/votes", voteRoutes(io));


io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
