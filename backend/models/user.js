const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} não é um email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: { 
    type: String, 
    enum: ['admin'], 
    default: 'admin' 
  }
});

module.exports = mongoose.model('user', userSchema);