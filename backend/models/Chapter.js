const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'], trim: true },
  description: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  sequenceOrder: { type: Number, required: true },
  liveClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LiveClass' }],
  recordings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recording' }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);