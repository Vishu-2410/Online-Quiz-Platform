import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TakeQuiz.css'; // Import the CSS file

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        console.log('Fetched quiz:', response.data);
        setQuiz(response.data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };
  
    fetchQuiz();
  }, [id]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if (quiz && selectedOption === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (quiz && nextQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption('');
    } else {
      setIsFinished(true);
    }
  };

  if (!quiz) return <div className="take-quiz-container">Loading...</div>;

  return (
    <div className="take-quiz-container">
      <div className="quiz-container">
        {isFinished ? (
          <div>
            <h2>Quiz Finished</h2>
            <p style={{fontSize:"1.5rem"}}>Your score: {score} / {quiz.questions.length}</p>
          </div>
        ) : (
          <div>
            <h2>{quiz.title}</h2>
            <div className="question-container">
              <p>{quiz.questions[currentQuestionIndex].question}</p>
            </div>
            <div className="option-container">
              {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="button-container">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
