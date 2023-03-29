const Joi = require('joi');

const id = Joi.number().integer();
const paid = Joi.boolean();
const userId = Joi.number().integer();

// const orderId = Joi.number().integer();
// const productId = Joi.number().integer();
// const total = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  paid: paid.required(),
  userId: userId.required(),
});

// const addItemSchema = Joi.object({
//   orderId: orderId.required(),
//   productId: productId.required(),
//   total: total.required(),
// });

const updateOrderSchema = Joi.object({
  paid: paid,
});

const findOneOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  findOneOrderSchema,
  // addItemSchema,
};
