const Joi = require('joi');

const id = Joi.number().integer();
const type = Joi.string().valid('product', 'consumable');
const closed = Joi.boolean();
const stockId = Joi.number().integer();
const consumableId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createStockSchema = Joi.object({
  type: type.required(),
  closed: closed.required(),
});

const updateStockSchema = Joi.object({
  type: type,
  closed: closed,
});

const findOneStockSchema = Joi.object({
  id: id.required(),
});

const addConsumableSchema = Joi.object({
  stockId: stockId.required(),
  consumableId: consumableId.required(),
  amount: amount.required(),
});

const addProductSchema = Joi.object({
  stockId: stockId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  createStockSchema,
  updateStockSchema,
  findOneStockSchema,
  addConsumableSchema,
  addProductSchema,
};
