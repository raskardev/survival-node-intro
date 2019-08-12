const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  age: Number,
  occupation: String,
  weapons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }],
});

const Survivor = mongoose.model('Survivor', schema);

module.exports = Survivor;
