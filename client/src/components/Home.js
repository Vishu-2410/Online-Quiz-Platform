import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="heading">Welcome to Online Quiz Maker</h1>
      <div className="link-container">
        <Link className="quiz-link" to="/create-quiz">Create a Quiz</Link>
        <Link className="quiz-link" to="/quizzes">Take a Quiz</Link>
      </div>
    </div>
  );
};

export default Home;
