const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Name required'], trim: true, maxlength: 100 },
  email: { type: String, required: [true, 'Email required'], unique: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email required'] },
  password: { type: String, required: [true, 'Password required'], minlength: 6, select: false },
  phone: { type: String, maxlength: 15 },
  avatar: String,
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);