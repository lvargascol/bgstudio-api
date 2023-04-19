const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string();
const lastName = Joi.string();
const phone = Joi.string().min(9);
const position = Joi.string();
const startedAt = Joi.date();
const birthday = Joi.date();
const active = Joi.boolean();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid('specialist');

const createSpecialistSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  position: position.required(),
  startedAt: startedAt.required(),
  birthday: birthday.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
  }),
});

const updateSpecialistSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  position: position,
  startedAt: startedAt,
  birthday: birthday,
  active: active,
  userId: userId,
});

const findOneCSpecialistSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSpecialistSchema,
  updateSpecialistSchema,
  findOneCSpecialistSchema,
};
