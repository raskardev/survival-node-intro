const validators = require('./validators');
const auth = require('../../utils/auth');

module.exports = function(db) {
  const findAll = async function() {
    try {
      const survivors = await db.Survivor.find({});

      return survivors;
    } catch (error) {
      const err = {
        code: 'survivors.findAll',
        message: error,
      };

      throw err;
    }
  };

  const findById = async function(id) {
    try {
      const survivor = await db.Survivor.findById(id).populate('weapons');

      return survivor;
    } catch (error) {
      const err = {
        code: 'survivors.findById',
        message: error,
      };

      throw err;
    }
  };

  const create = async function(data) {
    const survivorToBeCreated = data;
    const validation = validators.createValidator(survivorToBeCreated);

    if (validation.error) {
      throw validation.error.details;
    }

    try {
      const survivor = await db.Survivor.findOne({
        username: survivorToBeCreated.username,
      });

      if (survivor) {
        const err = {
          code: 'survivors.create',
          message: 'Ya existe un superviviente con este nombre de usuario',
        };

        throw err;
      }

      const encryptedPassword = await auth.encryptPassword(
        survivorToBeCreated.password
      );
      survivorToBeCreated.password = encryptedPassword;
      const createdSurvivor = await db.Survivor.create(survivorToBeCreated);

      return createdSurvivor;
    } catch (error) {
      const err = {
        code: 'survivors.create',
        message: error,
      };

      throw err;
    }
  };

  const update = async function(id, data) {
    try {
      const survivor = await db.Survivor.findByIdAndUpdate(id, data);

      return survivor;
    } catch (error) {
      const err = {
        code: 'survivors.update',
        message: error,
      };

      throw err;
    }
  };

  const remove = async function(id) {
    try {
      const survivor = await db.Survivor.findByIdAndRemove(id);

      return survivor;
    } catch (error) {
      const err = {
        code: 'survivors.remove',
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
  };
};
