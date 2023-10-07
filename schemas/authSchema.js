const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string().min(5);

const createNewPasswordSchema  = Joi.object({
  token: token.required(),
  newPassword: password.required(),
});

const recoveryPasswordSchema  = Joi.object({
  email: email.required(),
});


module.exports = { recoveryPasswordSchema , createNewPasswordSchema };
