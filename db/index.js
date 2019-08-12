const mongoose = require('mongoose');

// Aquí importamos los modelos
const Survivor = require('../domain/survivors/model');
const Weapon = require('../domain/weapons/model');

const start = mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.error(err.message);
      throw err;
    }

    console.log('MongoDB conectado');
  }
);

// Aquí se exportan los modelos
module.exports = {
  start,
  Survivor,
  Weapon,
};
