const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const authenticateUser = require("../middleware/authUserMiddleware"); 

// Routes defined for videos
router.post("/", authenticateUser, videoController.addVideo);
router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
router.delete("/:id", authenticateUser, videoController.deleteVideo);

module.exports = router;
