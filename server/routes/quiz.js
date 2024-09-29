// backend/routes/quiz.js
const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
      } catch (err) {
        console.error(err);
        res.status(400).send(err);
      }
});

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
      } catch (err) {
        res.status(400).send(err);
      }
});


router.get('/:id', async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }
      res.json(quiz);
    } catch (err) {
      res.status(400).send(err);
    }
  });
module.exports = router;
