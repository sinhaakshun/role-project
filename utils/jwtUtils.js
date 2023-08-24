const jwt = require('jsonwebtoken');

const SECRET_KEY = 'thisisasecretkey'; 

module.exports = {
  generateToken: (userData) => {
    const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
    return token;
  },

  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },
};