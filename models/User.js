import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Neteisingas el. pašto formatas']
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  photo: String
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
