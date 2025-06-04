import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Prisijungta prie MongoDB');
  } catch (err) {
    console.error('❌ Klaida jungiantis prie MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
