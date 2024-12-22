const User = require("../models/User");
const Video = require("../models/Video");

// Function to add a video to the database and associate it with a user
const addVideo = async (videoData, userId) => {
  const { title, url } = videoData;

  // Create a new video document with the provided title, URL, and user ID
  const newVideo = new Video({
    title,
    url,
    user_id: userId,
  });

  // Save the new video to the database
  await newVideo.save();

  // Find the user by userId to associate the video
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Add the new video ID to the user's 'videos' field
  user.videos.push(newVideo._id);
  await user.save(); // Save the updated user document

  return newVideo; // Return the created video object
};

// Function to get all videos, including user details (name, email)
const getAllVideos = async () => {
  // Find all videos and populate the 'user_id' field with user's name and email
  const videos = await Video.find().populate("user_id", "name email");
  return videos; // Return the array of videos
};

// Function to get a video by its ID, including user details
const getVideoById = async (videoId) => {
  // Find the video by its ID and populate the 'user_id' field with user's name and email
  const video = await Video.findById(videoId).populate("user_id", "name email");

  if (!video) {
    throw new Error("Video not found");
  }

  return video; // Return the video object
};

// Function to delete a video if the user is the uploader
const deleteVideo = async (videoId, userId) => {
  // Find the video by its ID
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error("Video not found");
  }

  // Check if the user is the one who uploaded the video
  if (video.user_id.toString() !== userId) {
    throw new Error("You are not the uploader of this video");
  }

  // Find the user by userId
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Remove the video ID from the user's 'videos' array
  user.videos = user.videos.filter(
    (id) => id.toString() !== video._id.toString()
  );
  await user.save(); // Save the updated user document

  // Delete the video document from the database
  await Video.deleteOne({ _id: videoId });

  return video; // Return the deleted video object
};

module.exports = { addVideo, getAllVideos, getVideoById, deleteVideo };
