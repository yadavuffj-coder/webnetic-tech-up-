const express = require('express');
const Quiz = require('../models/Quiz');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'fullName').populate('chapter');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy').populate('chapter');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const { title, description, chapter, questions, totalMarks, duration } = req.body;
    const quiz = new Quiz({ title, description, chapter, questions, totalMarks, duration, createdBy: req.user.userId });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/:id/submit', authenticate, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) score += question.marks;
    });
    const percentage = (score / quiz.totalMarks) * 100;
    const submission = { student: req.user.userId, answers, score, percentage, submittedAt: new Date() };
    
    quiz.submissions.push(submission);
    await quiz.save();
    res.json({ message: 'Quiz submitted', score, percentage, totalMarks: quiz.totalMarks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;