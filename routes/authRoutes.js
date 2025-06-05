import express from 'express';
import { registerUser, login } from '../controllers/authController.js';
import upload from '../middleware/multer.js'; // <- importuojam multer middleware

const router = express.Router();

router.post('/register', upload.single('photo'), registerUser); // <- čia įdedam nuotraukos upload
router.post('/login', login);

export default router;

