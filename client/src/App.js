// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import QuizResults from './components/QuizResults';
import QuizList from './components/QuizList';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/create-quiz" Component={CreateQuiz} />
        <Route path="/take-quiz/:id" Component={TakeQuiz} />
        <Route path="/results/:id" Component={QuizResults} />
        <Route path="/quizzes" Component={QuizList} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>

  );
}

export default App;




