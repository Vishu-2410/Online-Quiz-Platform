
const User = require('../models/user');
const Userlogin = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser =  async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.send('User registered');
  };
  
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Userlogin({ email, password: hashedPassword });
      await user.save();
      // res.send('User Login successful');
    } else {
      return res.status(400).send('User not found');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, 'secretkey');
      res.json({ token });
  
    } else {
      return res.status(400).send('Invalid credentials');
    }
  
  };

  exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error('Error getting user', error);
        res.status(500).send('Server error');
    }
};
  
exports.get = async (req, res) => {
    const users = await User.find();
    // const users1 = await Userlogin.find();
    console.log(users)
    res.json(users);
    // res.json(users1);
  };
  