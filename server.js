import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import accountsRoutes from './routes/accountsRoutes.js';
import connectDB from './config/db.js';
import authRoutes from'./routes/authRoutes.js';
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);


// Routes
app.use('/api/accounts', accountsRoutes);
connectDB(); // Prieš app.listen()
// Server start
app.listen(PORT, () => {
  console.log(`✅ Serveris veikia http://localhost:${PORT}`);
});
