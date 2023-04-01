'use strict';

const process = require('node:process');
const { verify } = require('@playerberry/token');

const Verifyer = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token || typeof token !== 'string') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const { status } = verify(token, process.env.TOKEN_SECRET);
    if (!status) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = Verifyer;
