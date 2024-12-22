const videoService = require("../services/videoService");
const authenticateUser = require("../middleware/authUserMiddleware");

// Controller function to add a new video
const addVideo = async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve the authenticated user's ID
    const video = await videoService.addVideo(req.body, userId); // Calls the service to add a new video
    res.status(201).json({ video }); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// Controller function to fetch all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos(); // Calls the service to retrieve all videos
    res.status(200).json(videos); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Controller function to fetch a specific video by its ID
const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id); // Fetches a video based on its ID
    res.status(200).json(video); 
  } catch (error) {
    res.status(404).json({ message: error.message }); 
  }
};

// Controller function to delete a video
const deleteVideo = async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve the authenticated user's ID
    const video = await videoService.deleteVideo(req.params.id, userId); // Calls the service to delete a video
    res.status(200).json({ message: "Video deleted", video }); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};


module.exports = { addVideo, getAllVideos, getVideoById, deleteVideo };
