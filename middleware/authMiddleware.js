import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("🔐 Gauta Authorization antraštė:", authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log("❌ Token nerastas");
    return res.status(401).json({ error: 'Nėra prieigos žetono' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ Token netinkamas:", err.message);
      return res.status(403).json({ error: 'Netinkamas žetonas' });
    }

    console.log("✅ Patikrintas naudotojas:", user);
    req.user = user;
    next();
  });
}
