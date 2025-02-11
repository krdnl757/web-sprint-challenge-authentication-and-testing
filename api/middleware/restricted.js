const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is provided
  if (!authHeader) {
    return res.status(401).json("token required");
  }

  const token = authHeader.split(' ')[1]; // Extract the token (e.g., "Bearer <token>")

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json("token invalid");
    }

    // Token is valid, attach decoded payload to the request
    req.user = decoded;
    next();
  });
};
