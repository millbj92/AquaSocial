const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const header = req.header('Authorization');

  if (!header) {
    return res.status(401).json({ msg: 'Invalid Authorization Scheme' });
  }

  const parts = header.split(' ');

  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      token = credentials;

      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }

      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
    } else {
      return res.status(401).json({ msg: 'Invalid Authorization Scheme' });
    }
  } else {
    return res.status(401).json({ msg: 'Invalid Authorization Scheme' });
  }
};
