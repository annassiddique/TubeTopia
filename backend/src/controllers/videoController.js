const videoService = require("../services/videoService");
const authenticateUser = require("../middleware/authUserMiddleware"); 


const addVideo = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const video = await videoService.addVideo(req.body, userId);
    res.status(201).json({ video });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const deleteVideo = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const video = await videoService.deleteVideo(req.params.id, userId);
    res.status(200).json({ message: "Video deleted", video });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addVideo, getAllVideos, getVideoById, deleteVideo };
