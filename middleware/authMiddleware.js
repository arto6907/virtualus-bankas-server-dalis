import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Paima token po 'Bearer'

  if (!token) return res.status(401).json({ error: 'Nėra prieigos žetono' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Netinkamas žetonas' });
    req.user = user;
    next();
  });
}
