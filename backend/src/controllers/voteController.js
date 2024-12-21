const {
  VoteService,
  EloService,
  notifyClients,
} = require("../services/voteService");
const Video = require("../models/Video");

const getVotingVideos = async (req, res) => {
  try {
    const videos = await VoteService.getRandomVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postVote = async (req, res, io) => {
  const { videoAId, videoBId, winner } = req.body;

  if (!videoAId || !videoBId || !winner) {
    return res
      .status(400)
      .json({ message: "Please provide both video IDs and the winner" });
  }

  try {
    const videoA = await Video.findById(videoAId);
    const videoB = await Video.findById(videoBId);

    if (!videoA || !videoB) {
      return res.status(404).json({ message: "One or both videos not found" });
    }

    const { newEloA, newEloB } = await EloService.calculateAndUpdateElo(
      videoA,
      videoB,
      winner
    );

    const winnerId = winner === "A" ? videoA._id : videoB._id;
    await VoteService.recordVote(videoA, videoB, winnerId);

    // Notify connected clients about the updated Elo scores
    notifyClients(io, videoAId, videoBId, newEloA, newEloB);

    res.json({ message: "Vote recorded and Elo scores updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getRankings = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));

    const skip = (page - 1) * limit;

    const totalVideos = await Video.countDocuments();

    const rankings = await VoteService.getRankedVideos(page, limit);

    const totalPages = Math.ceil(totalVideos / limit);

    res.json({
      videos: rankings,
      total: totalVideos,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVotingVideos, postVote, getRankings };
