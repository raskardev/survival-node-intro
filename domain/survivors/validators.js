const Joi = require('@hapi/joi');

const validationSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .required(),
  age: Joi.number().required(),
  occupation: Joi.string().optional(),
  weapons: Joi.array().default([]),
});

const createValidator = function(survivor) {
  return Joi.validate(survivor, validationSchema);
};

module.exports = {
  createValidator,
};
