const bcrypt = require('bcrypt');

const encryptPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);

  if (hash) {
    return hash;
  }

  throw 'Ha ocurrido un error al encriptar la contraseña';
};

module.exports = {
  encryptPassword,
};
