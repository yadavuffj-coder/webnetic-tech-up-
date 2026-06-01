const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'], trim: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  sequenceOrder: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);