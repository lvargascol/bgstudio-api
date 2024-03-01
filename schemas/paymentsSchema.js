const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer();
const confirmed = Joi.boolean();
const orderId = Joi.number().integer();
const type = Joi.string().min(3);

const createPaymentSchema = Joi.object({
  amount: amount.required(),
  confirmed: confirmed.required(),
  type: type.required(),
  orderId: orderId.required(),
});

const updatePaymentSchema = Joi.object({
  confirmed: confirmed,
});

const findOnePaymentSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
  findOnePaymentSchema,
};
