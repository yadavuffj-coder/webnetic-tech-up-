const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'] },
  description: String,
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: Date,
  jitsiRoom: String,
  status: { type: String, enum: ['scheduled', 'live', 'completed', 'cancelled'], default: 'scheduled' },
  participants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, joinedAt: Date, leftAt: Date, duration: Number }],
  recordingUrl: String,
  isRecorded: { type: Boolean, default: false },
  maxParticipants: { type: Number, default: 50 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('LiveClass', liveClassSchema);