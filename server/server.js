// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');
const { protect } = require('./middleware/authMiddleware');


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/online-quiz-maker', { useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);

});

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);

// Protected route example
app.get('/api/protected', protect, (req, res) => {
  res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
