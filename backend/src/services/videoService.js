const User = require("../models/User");
const Video = require("../models/Video");

const addVideo = async (videoData, userId) => {
  const { title, url } = videoData;

  const newVideo = new Video({
    title,
    url,
    user_id: userId,
  });

  await newVideo.save();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.videos.push(newVideo._id);
  await user.save();

  return newVideo;
};

const getAllVideos = async () => {
  const videos = await Video.find().populate("user_id", "name email");
  return videos;
};

const getVideoById = async (videoId) => {
  const video = await Video.findById(videoId).populate("user_id", "name email");

  if (!video) {
    throw new Error("Video not found");
  }

  return video;
};

const deleteVideo = async (videoId, userId) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw new Error("Video not found");
  }

  if (video.user_id.toString() !== userId) {
    throw new Error("You are not the uploader of this video");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }


  user.videos = user.videos.filter(
    (id) => id.toString() !== video._id.toString()
  );
  await user.save();


  await Video.deleteOne({ _id: videoId });

  return video;
};

module.exports = { addVideo, getAllVideos, getVideoById, deleteVideo };
