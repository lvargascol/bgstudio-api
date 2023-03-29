const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer();
const paid = Joi.boolean();
const orderId = Joi.number().integer();

const createPaymentSchema = Joi.object({
  amount: amount.required(),
  paid: paid.required(),
  orderId: orderId.required(),
});

const updatePaymentSchema = Joi.object({
  paid: paid,
});

const findOnePaymentSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
  findOnePaymentSchema,
};
