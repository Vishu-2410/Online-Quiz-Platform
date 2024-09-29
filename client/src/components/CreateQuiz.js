import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateQuiz.css'; // Import your CSS file for styling

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const clearForm = () => {
    setTitle('');
    setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting quiz:', { title, questions });
      const response = await axios.post('http://localhost:5000/api/quizzes/create', { title, questions });
      console.log('Quiz created:', response.data);
      clearForm(); // Clear the form after successful submission
      navigate('/quizzes'); // Redirect to the quiz list page
    } catch (err) {
      console.error('Error creating quiz:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="create-quiz-page">
      <div className="sidebar">
        <h2>Create a New Quiz</h2>
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
        <button type="button" onClick={clearForm}>Clear Form</button>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="questions-container">
            {questions.map((q, index) => (
              <div className="question-container" key={index}>
                <label>Question {index + 1}:</label>
                <input
                  type="text"
                  name="question"
                  value={q.question}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
                {q.options.map((option, optIndex) => (
                  <div className="option-container" key={optIndex}>
                    <label>Option {optIndex + 1}:</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(e, index, optIndex)}
                      required
                    />
                  </div>
                ))}
                <label>Correct Answer:</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={q.correctAnswer}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
            ))}
          </div>
          <div className="button-container">
            <button type="submit">Create Quiz</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
