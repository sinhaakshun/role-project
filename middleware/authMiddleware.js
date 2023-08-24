const jwtUtils = require('../utils/jwtUtils');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const decodedToken = jwtUtils.verifyToken(token);

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log(err);
    res.json({ error: 'Invalid token' });
  }
};
