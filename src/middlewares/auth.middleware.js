const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token || token.trim() === '') {
    return res.status(401).json({ error: 'Token is empty' });
  }

  try {
    // This will throw an error if the token is expired or invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: Log expiry time
    console.log('Token expires at:', new Date(decoded.exp * 1000).toLocaleString());
    console.log('Decoded token:', decoded.id);


    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.json({status : 401, error: 'Invalid token user' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.json({ status : 401, error: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.json({status : 401, error: 'Invalid token' });
    } else {
      return res.json({status : 401, error: err.message });
    }
  }
};
