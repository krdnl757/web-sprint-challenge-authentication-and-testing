const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock users array (replace with a database in production)
const users = [];

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Helper function to find a user by username
const findUserByUsername = (username) => users.find((user) => user.username === username);

// [POST] /register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json("username and password required");
  }

  // Check if username is already taken
  if (findUserByUsername(username)) {
    return res.status(400).json("username taken");
  }

  // Hash the password
  const saltRounds = 8; // Do not exceed 2^8 rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Save the user
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);

  // Respond with the newly created user
  res.status(201).json(newUser);
});

// [POST] /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json("username and password required");
  }

  // Find the user
  const user = findUserByUsername(username);
  if (!user) {
    return res.status(400).json("invalid credentials");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json("invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Respond with token and welcome message
  res.status(200).json({
    message: `welcome, ${user.username}`,
    token,
  });
});

module.exports = router;
