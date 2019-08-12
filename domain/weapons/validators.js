const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid('melee', 'ranged'),
});

const createValidator = function(weapon) {
  return Joi.validate(weapon, schema);
};

module.exports = {
  createValidator,
};
