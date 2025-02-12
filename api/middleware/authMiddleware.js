const jwt = require('jsonwebtoken');

const SECRET = 'supersecretkey'; // Use the same secret as in the auth route.

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token required.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach user information to the request object.
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
