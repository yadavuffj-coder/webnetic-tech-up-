const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  liveClass: { type: mongoose.Schema.Types.ObjectId, ref: 'LiveClass' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  status: { type: String, enum: ['present', 'absent', 'late'], default: 'absent' },
  joinedAt: Date,
  leftAt: Date,
  duration: Number,
  attendanceDate: Date,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);