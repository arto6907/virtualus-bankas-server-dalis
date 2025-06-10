import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createAdminIfMissing = async () => {
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log("👤 Admin jau yra");
    return;
  }

  const hashedPassword = await bcrypt.hash('Test@1234', 10); // ✅ Saugus slaptažodis

  await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'Test',
    photo: null
  });

  console.log("✅ Sukurtas ADMIN: admin@example.com / Test@1234");
};

export default createAdminIfMissing;
