const express = require('express');
const LiveClass = require('../models/LiveClass');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const liveClasses = await LiveClass.find().populate('instructor', 'fullName email').populate('chapter');
    res.json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id).populate('instructor').populate('chapter');
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });
    res.json(liveClass);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const { title, description, chapter, startTime, endTime } = req.body;
    const liveClass = new LiveClass({ title, description, chapter, instructor: req.user.userId, startTime, endTime, jitsiRoom: `webnetic-${Date.now()}` });
    await liveClass.save();
    res.status(201).json({ message: 'Live class created', liveClass });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/start', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });
    liveClass.status = 'live';
    await liveClass.save();
    res.json({ message: 'Live class started', liveClass });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/join', authenticate, async (req, res) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });
    const participant = { user: req.user.userId, joinedAt: new Date() };
    liveClass.participants.push(participant);
    await liveClass.save();
    res.json({ message: 'Joined live class', liveClass });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/end', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });
    liveClass.status = 'completed';
    liveClass.endTime = new Date();
    await liveClass.save();
    res.json({ message: 'Live class ended', liveClass });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;