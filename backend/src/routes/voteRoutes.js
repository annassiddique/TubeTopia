const express = require("express");
const router = express.Router();
const {
  getVotingVideos,
  postVote,
  getRankings,
} = require("../controllers/voteController");


module.exports = (io) => {
  router.get("/", getVotingVideos);
  router.post("/", (req, res) => postVote(req, res, io)); 
  router.get("/rankings", getRankings);

  return router;
};
