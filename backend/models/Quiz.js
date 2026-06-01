const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ question: String, questionType: { type: String, enum: ['multiple-choice', 'short-answer', 'true-false'] }, options: [String], correctAnswer: String, explanation: String, marks: { type: Number, default: 1 } }],
  totalMarks: { type: Number, required: true },
  passingMarks: Number,
  duration: Number,
  isPublished: { type: Boolean, default: true },
  submissions: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, answers: [String], score: Number, percentage: Number, submittedAt: Date }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);