const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  fileUrl: { type: String, required: true },
  fileName: String,
  fileType: { type: String, enum: ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx'] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: true },
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);