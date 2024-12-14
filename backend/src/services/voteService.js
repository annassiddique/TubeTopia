const Video = require("../models/Video");
const Vote = require("../models/Vote");
const { calculateElo } = require("../utils/eloCalculator");


const EloService = {
  calculateAndUpdateElo: async (videoA, videoB, winner) => {
    const { newEloA, newEloB } = calculateElo(
      videoA.elo_score,
      videoB.elo_score,
      winner === 'A' ? 'A' : 'B'
    );

    await updateVideoElo(videoA, newEloA);
    await updateVideoElo(videoB, newEloB);
    return { newEloA, newEloB };
  },
};


const VoteService = {
  recordVote: async (videoA, videoB, winnerId) => {
    const newVote = new Vote({
      video1_id: videoA._id,
      video2_id: videoB._id,
      winner_id: winnerId,
    });

    await newVote.save();
  },

  getRandomVideos: async () => {
    const videoCount = await Video.countDocuments();
    let randomIndexA = Math.floor(Math.random() * videoCount);
    let randomIndexB = Math.floor(Math.random() * videoCount);

    while (randomIndexA === randomIndexB) {
      randomIndexB = Math.floor(Math.random() * videoCount);
    }

    const videoA = await Video.findOne().skip(randomIndexA);
    const videoB = await Video.findOne().skip(randomIndexB);

    return { videoA, videoB };
  },

  getRankedVideos: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const videos = await Video.find()
      .sort({ elo_score: -1 })
      .skip(skip)
      .limit(limit);
    return videos;
  }
};

const updateVideoElo = async (video, newElo) => {
  video.elo_score = newElo;
  await video.save();
};


const notifyClients = (io, videoAId, videoBId, newEloA, newEloB) => {
    io.emit('rankUpdate', { videoAId, videoBId, newEloA, newEloB });
};
  

module.exports = { EloService, VoteService, notifyClients };
