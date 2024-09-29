import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './QuizList.css'; // Import the CSS file

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchQuizzes();
  }, []);

  if (error) return <div className="quiz-list-container">Error fetching quizzes: {error.message}</div>;

  return (
    <div className="quiz-list-container">
      <div className="content-container">
        <h2>Available Quizzes</h2>
        <ul className="list-container">
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <Link to={`/take-quiz/${quiz._id}`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
