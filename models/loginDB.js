const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model('login', userSchema);
