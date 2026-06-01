const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'], unique: true, trim: true },
  description: { type: String, required: [true, 'Description required'] },
  thumbnail: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);