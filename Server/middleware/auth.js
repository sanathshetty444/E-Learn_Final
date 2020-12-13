const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token)
      return res
        .status(401)
        .json({ message: 'No authentication token, Authorization failed.' });

    const verified = jwt.verify(token, '6T\Ecj,-z@phUer4,M5?#<9_t46^#c');
    if (!verified) {
      return res
        .status(401)
        .json({ message: 'Token verification failed, Authorization denied.' });
    }
    req.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
