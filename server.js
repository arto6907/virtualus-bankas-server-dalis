// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import accountsRoutes from './routes/accountsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);

// DB connection
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`✅ Serveris veikia: http://localhost:${PORT}`);
});
