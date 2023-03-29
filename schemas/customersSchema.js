const Joi = require('joi');

// const id = Joi.string().uuid();
const id = Joi.number().integer();
const firstName = Joi.string();
const lastName = Joi.string();
const phone = Joi.string().min(9);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  userId: userId, //*
});

const findOneCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  findOneCustomerSchema,
};
