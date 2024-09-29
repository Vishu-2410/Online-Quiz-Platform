import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './QuizResults.css'; // Import your CSS file for styling

const QuizResults = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAnswers = () => {
      const storedAnswers = JSON.parse(localStorage.getItem('quiz-answers'));
      if (storedAnswers && storedAnswers.quizId === id) {
        setAnswers(storedAnswers.answers);
        calculateScore(storedAnswers.answers, storedAnswers.quiz);
      }
    };

    fetchQuiz();
    fetchAnswers();
  }, [id]);

  const calculateScore = (answers, quiz) => {
    let score = 0;
    quiz.questions.forEach((question, qIndex) => {
      if (question.options[answers[qIndex]].isCorrect) {
        score++;
      }
    });
    setScore(score);
  };

  if (!quiz || !answers) return <div className="loading">Loading...</div>;

  return (
    <div className="results-container">
      <h2 className="quiz-title">{quiz.title} - Results</h2>
      <p className="quiz-score">Your Score: {score} / {quiz.questions.length}</p>
      <div className="questions-container">
        {quiz.questions.map((question, qIndex) => (
          <div className="question-item" key={qIndex}>
            <h4 className="question-text">{question.questionText}</h4>
            {question.options.map((option, oIndex) => (
              <p
                key={oIndex}
                className={`option-text ${option.isCorrect ? 'correct' : answers[qIndex] === oIndex ? 'incorrect' : ''}`}
              >
                {option.text}
              </p>
            ))}
          </div>
        ))}
  
      </div>
      
      <Link className="back-link" to="/quizzes">Back to Quiz List</Link>
    </div>
  );
};

export default QuizResults;
