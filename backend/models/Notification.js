const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['course', 'class', 'assignment', 'grade', 'general'], default: 'general' },
  relatedItem: { itemId: mongoose.Schema.Types.ObjectId, itemType: { type: String, enum: ['Course', 'LiveClass', 'Assignment', 'Quiz'] } },
  isRead: { type: Boolean, default: false },
  readAt: Date,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);