import express from 'express';
import {
  getAllAccounts,
  createAccount,
  getAccount,
  deleteAccount,
  addFunds,
  withdrawFunds,
} from '../controllers/accountController.js';

const router = express.Router();

router.get('/', getAllAccounts);
router.post('/', createAccount);
router.get('/:id', getAccount);
router.delete('/:id', deleteAccount);

// Pridėti lėšų
router.patch('/add/:id', addFunds);

// Nurašyti lėšas
router.post('/withdraw/:id', withdrawFunds);

export default router;
