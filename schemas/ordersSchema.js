const Joi = require('joi');

const id = Joi.number().integer();
const paid = Joi.boolean();
const notes = Joi.string();
const userId = Joi.number().integer();

const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  userId: userId.required(),
  // paid: paid.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const updateOrderSchema = Joi.object({
  paid: paid,
  notes: notes,
});

const findOneOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  findOneOrderSchema,
  addItemSchema,
};
