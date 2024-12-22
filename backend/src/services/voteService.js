const Video = require("../models/Video");
const Vote = require("../models/Vote");
const { calculateElo } = require("../utils/eloCalculator");

const EloService = {
  // Calculate and update Elo scores for two videos based on the winner
  calculateAndUpdateElo: async (videoA, videoB, winner) => {
    // Calculate new Elo scores for both videos
    const { newEloA, newEloB } = calculateElo(
      videoA.elo_score,
      videoB.elo_score,
      winner === "A" ? "A" : "B"
    );

    // Update Elo scores in the database
    await updateVideoElo(videoA, newEloA);
    await updateVideoElo(videoB, newEloB);

    // Return new Elo scores
    return { newEloA, newEloB };
  },
};

const VoteService = {
  // Record a new vote in the database
  recordVote: async (videoA, videoB, winnerId) => {
    const newVote = new Vote({
      video1_id: videoA._id,
      video2_id: videoB._id,
      winner_id: winnerId,
    });

    // Save the vote to the database
    await newVote.save();
  },

  // Fetch two random videos for comparison
  getRandomVideos: async () => {
    const videoCount = await Video.countDocuments();
    let randomIndexA = Math.floor(Math.random() * videoCount);
    let randomIndexB = Math.floor(Math.random() * videoCount);

    // Ensure videos are different
    while (randomIndexA === randomIndexB) {
      randomIndexB = Math.floor(Math.random() * videoCount);
    }

    // Fetch the videos from the database
    const videoA = await Video.findOne().skip(randomIndexA);
    const videoB = await Video.findOne().skip(randomIndexB);

    return { videoA, videoB };
  },

  // Get a list of ranked videos based on Elo score
  getRankedVideos: async (page, limit) => {
    const skip = (page - 1) * limit;

    // Fetch and return videos sorted by Elo score with pagination
    return await Video.find().sort({ elo_score: -1 }).skip(skip).limit(limit);
  },
};

// Update the Elo score of a video
const updateVideoElo = async (video, newElo) => {
  video.elo_score = newElo;
  await video.save();
};

// Notify clients (via Socket.io) about the updated Elo scores
const notifyClients = (io, videoAId, videoBId, newEloA, newEloB) => {
  io.emit("voteUpdate", {
    videoAId,
    videoBId,
    newEloA,
    newEloB,
    message: "Vote has been recorded and Elo scores updated",
  });
};

module.exports = { EloService, VoteService, notifyClients };
