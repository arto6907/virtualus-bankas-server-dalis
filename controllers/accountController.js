import Account from '../models/Account.js';

// Gauti visas sąskaitas
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ lastName: 1 });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko gauti sąskaitų' });
  }
};

// Sukurti naują sąskaitą
export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, idCode } = req.body;

    // Tikrinam asmens kodo formatą (11 skaičių)
    const isValidIdCode = /^\d{11}$/.test(idCode);
    if (!isValidIdCode) {
      return res.status(400).json({ error: 'Neteisingas asmens kodo formatas' });
    }

    // Tikrinam ar jau egzistuoja toks asmens kodas
    const existing = await Account.findOne({ idCode });
    if (existing) {
      return res.status(400).json({ error: 'Asmens kodas jau egzistuoja' });
    }

    // Generuojam lietuvišką IBAN
    const iban = generateIban();

    const newAccount = new Account({
      firstName,
      lastName,
      idCode,
      iban,
      balance: 0,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko sukurti sąskaitos' });
  }
};

// Paprasta IBAN generavimo funkcija
function generateIban() {
  const country = 'LT';
  const control = '00';
  const bankCode = '10000';
  const accountNumber = String(Math.floor(Math.random() * 10 ** 13)).padStart(13, '0');
  return `${country}${control}${bankCode}${accountNumber}`;
}

// Gauti vieną sąskaitą pagal ID
export const getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: 'Klaida gaunant sąskaitą' });
  }
};

// Ištrinti sąskaitą
export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Nerasta sąskaita' });

    if (account.balance > 0) {
      return res.status(400).json({ error: 'Negalima ištrinti sąskaitos su likučiu' });
    }

    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sąskaita pašalinta' });
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko ištrinti sąskaitos' });
  }
};

// Pridėti lėšų prie sąskaitos
export const addFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });

    account.balance += Number(amount);
    await account.save();

    res.json(account);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko pridėti lėšų' });
  }
};

// Nurašyti lėšas
export const withdrawFunds = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: 'Suma turi būti didesnė už 0' });
    }

    const account = await Account.findById(id);
    if (!account) return res.status(404).json({ error: 'Sąskaita nerasta' });

    if (account.balance < amount) {
      return res.status(400).json({ error: 'Nepakanka lėšų' });
    }

    account.balance -= amount;
    await account.save();
    res.json({ message: 'Lėšos nurašytos', account });
  } catch (err) {
    res.status(500).json({ error: 'Klaida nurašant lėšas' });
  }
};
