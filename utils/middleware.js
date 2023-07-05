const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../production.env' });

const secretKey = process.env.SECRET_KEY || 'campdilly'
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Set the user data in the request object
    req.user = decoded;
    next();
  });
}

