const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  videoUrl: { type: String, required: true },
  thumbnail: String,
  duration: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  liveClass: { type: mongoose.Schema.Types.ObjectId, ref: 'LiveClass' },
  isPublished: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  viewedBy: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, viewedAt: Date, watchDuration: Number }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Recording', recordingSchema);