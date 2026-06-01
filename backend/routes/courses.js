const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'fullName email').populate('subjects');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor').populate({ path: 'subjects', populate: { path: 'chapters' } });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const { title, description, category, level, price, isFree } = req.body;
    const course = new Course({ title, description, category, level, price, isFree, instructor: req.user.userId });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user.userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
    
    const { title, description, category, level, price, isFree } = req.body;
    course = Object.assign(course, { title, description, category, level, price, isFree });
    await course.save();
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user.userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/enroll', authenticate, authorize(['student']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.enrolledStudents.includes(req.user.userId)) return res.status(400).json({ message: 'Already enrolled' });
    
    course.enrolledStudents.push(req.user.userId);
    await course.save();
    await User.findByIdAndUpdate(req.user.userId, { $push: { enrolledCourses: course._id } }, { new: true });
    res.json({ message: 'Enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;