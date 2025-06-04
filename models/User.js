import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El. paštas yra privalomas'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Neteisingas el. pašto formatas']
  },
  password: {
    type: String,
    required: [true, 'Slaptažodis yra privalomas'],
    minlength: [8, 'Slaptažodis turi būti bent 8 simbolių']
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
