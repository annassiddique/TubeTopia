const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  elo_score: { type: Number, default: 1500 },
  upload_date: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
