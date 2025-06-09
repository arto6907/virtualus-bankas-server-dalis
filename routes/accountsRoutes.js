import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import {
  getAllAccounts,
  createAccount,
  getAccount,
  deleteAccount,
  addFunds,
  withdrawFunds,
} from '../controllers/accountController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// 📁 Jei trūksta 'uploads' aplanko – sukuria
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer konfigūracija
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Apsaugoti route'ai su token tikrinimu
router.get('/', authenticateToken, getAllAccounts);
router.get('/:id', authenticateToken, getAccount);
router.delete('/:id', authenticateToken, deleteAccount);
router.patch('/add/:id', authenticateToken, addFunds);
router.post('/withdraw/:id', authenticateToken, withdrawFunds);

// ✅ Sąskaitos sukūrimas su nuotrauka – BE auth (galima daryti ir su auth)
router.post('/', upload.single('image'), createAccount);

export default router;
