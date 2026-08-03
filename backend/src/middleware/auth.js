import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ashraf_portfolio_jwt_secret_key_98765');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

export default authMiddleware;
