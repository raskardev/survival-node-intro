const validators = require('./validators');

module.exports = function(db) {
  const findAll = async function() {
    try {
      const weapons = await db.Weapon.find({});

      return weapons;
    } catch (error) {
      const err = {
        code: 'weapons.findAll',
        message: error,
      };

      throw err;
    }
  };

  const findById = async function(id) {
    try {
      const weapon = await db.Weapon.findById(id);

      return weapon;
    } catch (error) {
      const err = {
        code: 'weapons.findById',
        message: error,
      };

      throw err;
    }
  };

  const create = async function(data) {
    const weaponToBeCreated = data;
    const validation = validators.createValidator(weaponToBeCreated);

    if (validation.error) {
      throw validation.error.details;
    }

    try {
      const createdWeapon = await db.Weapon.create(weaponToBeCreated);

      return createdWeapon;
    } catch (error) {
      const err = {
        code: 'weapons.create',
        message: error,
      };

      throw err;
    }
  };

  const update = async function(id, data) {
    try {
      await db.Weapon.findByIdAndUpdate(id, data);
      const updatedWeapon = await db.Weapon.findById(id);

      return updatedWeapon;
    } catch (error) {
      const err = {
        code: 'weapons.update',
        message: error,
      };

      throw err;
    }
  };

  const remove = async function(id) {
    try {
      const deletedWeapon = await db.Weapon.findByIdAndRemove(id);

      return deletedWeapon;
    } catch (error) {
      const err = {
        code: 'weapons.delete',
        message: error,
      };

      throw err;
    }
  };

  const addWeapon = async function(survivorId, weaponId) {
    try {
      const survivor = await db.Survivor.findByIdAndUpdate(survivorId, {
        $push: { weapons: weaponId },
      });

      return survivor;
    } catch (error) {
      const err = {
        code: 'weapons.addWeapon',
        message: error,
      };

      throw err;
    }
  };

  return {
    findAll,
    findById,
    create,
    update,
    remove,
    addWeapon,
  };
};
