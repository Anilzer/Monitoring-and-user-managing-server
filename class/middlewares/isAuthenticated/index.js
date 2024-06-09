
import jwt from 'jsonwebtoken';
import fs from 'fs';

const publicKey = fs.readFileSync('./public.key', 'utf8');

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token' });
    }
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: `Authentication failed: ${error.message}` });
  }
}
export {isAuthenticated};
