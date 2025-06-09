import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  idCode: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  image: String,
  iban: String,
  balance: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);
export default Account;
