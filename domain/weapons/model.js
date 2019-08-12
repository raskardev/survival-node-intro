const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  type: String,
});

const Weapon = mongoose.model('Weapon', schema);

module.exports = Weapon;
