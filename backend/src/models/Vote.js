const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  video1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  video2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  winner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  timestamp: { type: Date, default: Date.now },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
