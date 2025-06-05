// controllers/accountController.js
import Account from '../models/Account.js';
import fs from 'fs';

// Sukurti naują sąskaitą
export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, idCode } = req.body;

    const isValidIdCode = /^\d{11}$/.test(idCode);
    if (!isValidIdCode) {
      return res.status(400).json({ error: 'Neteisingas asmens kodo formatas' });
    }

    const existing = await Account.findOne({ idCode });
    if (existing) {
      return res.status(400).json({ error: 'Asmens kodas jau egzistuoja' });
    }

    const iban = generateIban();
    const imagePath = req.file?.path || '';

    const newAccount = new Account({
      firstName,
      lastName,
      idCode,
      iban,
      image: imagePath,
      balance: 0,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (err) {
    console.error('Klaida kuriant sąskaitą:', err);
    res.status(500).json({ error: 'Nepavyko sukurti sąskaitos' });
  }
};

// Gauti visas sąskaitas
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ lastName: 1 });
    res.json(accounts);
  } catch (err) {
    console.error('Klaida gaunant sąskaitas:', err);
    res.status(500).json({ error: 'Nepavyko gauti sąskaitų' });
  }
};

// Gauti vieną sąskaitą pagal ID
export const getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });
    res.json(account);
  } catch (err) {
    console.error('Klaida gaunant sąskaitą:', err);
    res.status(500).json({ error: 'Nepavyko gauti sąskaitos' });
  }
};

// Ištrinti sąskaitą
export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });

    // Ištrinam nuotrauką iš uploads jei yra
    if (account.image && fs.existsSync(account.image)) {
      fs.unlinkSync(account.image);
    }

    res.json({ message: 'Sąskaita ištrinta' });
  } catch (err) {
    console.error('Klaida trinant sąskaitą:', err);
    res.status(500).json({ error: 'Nepavyko ištrinti sąskaitos' });
  }
};

// Pridėti lėšų
export const addFunds = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });

    const amount = Number(req.body.amount);
    account.balance += amount;
    await account.save();

    res.json(account);
  } catch (err) {
    console.error('Klaida pridedant lėšas:', err);
    res.status(500).json({ error: 'Nepavyko pridėti lėšų' });
  }
};

// Nurašyti lėšas
export const withdrawFunds = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });

    const amount = Number(req.body.amount);
    if (account.balance < amount) {
      return res.status(400).json({ error: 'Nepakanka lėšų' });
    }

    account.balance -= amount;
    await account.save();

    res.json(account);
  } catch (err) {
    console.error('Klaida nurašant lėšas:', err);
    res.status(500).json({ error: 'Nepavyko nurašyti lėšų' });
  }
};

// IBAN generatorius
function generateIban() {
  const country = 'LT';
  const control = '00';
  const bankCode = '10000';
  const accountNumber = String(Math.floor(Math.random() * 10 ** 13)).padStart(13, '0');
  return `${country}${control}${bankCode}${accountNumber}`;
}
