const User = require('../users/user.model')
const Task = require('../tasks/task.model')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = '10 minutes';

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    // const token = createToken(user);
    res.render('login', { message: 'Signup successful. Please log in.' });

    // res.status(201).json({ user: { id: user._id, name: user.name }, token });
  } catch (err) {
    res.render('signup', { error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true });


    // res.status(200).json({
    //   user: { id: user._id, name: user.name },
    //   token
    // });
    res.render('index', { 
    message: 'Login successful.', 
    todos: await Task.find({ user_id: user._id }),
    // todos: ['Dance', 'Eat', 'Sing'],
    user: { 
      id: user._id,
      name: user.name
     },
     selectedStatus: ''
  });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    signup,
    login
}
