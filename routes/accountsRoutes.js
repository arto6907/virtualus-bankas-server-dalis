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

const router = express.Router();

// Upload aplanko kūrimas
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer konfiguracija
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST su nuotrauka
router.post('/', upload.single('photo'), createAccount);

// Likusios
router.get('/', getAllAccounts);
router.get('/:id', getAccount);
router.delete('/:id', deleteAccount);
router.patch('/add/:id', addFunds);
router.post('/withdraw/:id', withdrawFunds);

export default router;
