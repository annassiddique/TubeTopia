const {
  VoteService,
  EloService,
  notifyClients,
} = require("../services/voteService");
const Video = require("../models/Video");

// Controller function to fetch videos for voting
const getVotingVideos = async (req, res) => {
  try {
    const videos = await VoteService.getRandomVideos(); // Fetches random videos for voting
    res.json(videos); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Controller function to handle voting and update Elo scores
const postVote = async (req, res, io) => {
  const { videoAId, videoBId, winner } = req.body;

  // Validates the request body for required data
  if (!videoAId || !videoBId || !winner) {
    return res
      .status(400)
      .json({ message: "Please provide both video IDs and the winner" });
  }

  try {
    const videoA = await Video.findById(videoAId); // Finds video A by ID
    const videoB = await Video.findById(videoBId); // Finds video B by ID

    // Validates if both videos are found
    if (!videoA || !videoB) {
      return res.status(404).json({ message: "One or both videos not found" });
    }

    // Calculates new Elo scores for both videos
    const { newEloA, newEloB } = await EloService.calculateAndUpdateElo(
      videoA,
      videoB,
      winner
    );

    const winnerId = winner === "A" ? videoA._id : videoB._id;
    await VoteService.recordVote(videoA, videoB, winnerId); // Records the vote

    // Notify connected clients about the updated Elo scores
    notifyClients(io, videoAId, videoBId, newEloA, newEloB);

    res.json({ message: "Vote recorded and Elo scores updated" }); // Responds with a success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handles errors
  }
};

// Controller function to get ranked videos with pagination
const getRankings = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    // Ensures valid pagination values
    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));

    const skip = (page - 1) * limit;

    const totalVideos = await Video.countDocuments(); // Counts the total number of videos

    const rankings = await VoteService.getRankedVideos(page, limit); // Retrieves ranked videos

    const totalPages = Math.ceil(totalVideos / limit); // Calculates the total pages for pagination

    res.json({
      videos: rankings,
      total: totalVideos,
      totalPages: totalPages, // Sends the rankings and pagination info
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handles errors
  }
};

module.exports = { getVotingVideos, postVote, getRankings };
