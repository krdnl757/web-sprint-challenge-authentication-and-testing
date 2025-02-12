const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const router = express.Router();

const SECRET = 'supersecretkey'; // Change this to a secure, environment-variable-based key.

// [POST] /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'Username is already taken.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully!' });
});

// [POST] /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

module.exports = router;
