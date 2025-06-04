import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registracija sėkminga' });
  } catch (err) {
    res.status(400).json({ error: 'Registracijos klaida' });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Vartotojas nerastas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Neteisingas slaptažodis' });

    res.json({
      message: 'Prisijungimas sėkmingas',
      userId: user._id,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: 'Prisijungimo klaida' });
  }
};

