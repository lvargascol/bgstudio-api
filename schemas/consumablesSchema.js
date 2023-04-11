const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const amount = Joi.number().integer().min(0);
const description = Joi.string();

// const limit = Joi.number().integer();
// const offset = Joi.number().integer();

// const price_min = Joi.number().integer();
// const price_max = Joi.number().integer();

const createConsumableSchema = Joi.object({
  name: name.required(),
  amount: amount.required(),
  description: description.required(),
});

const updateConsumableSchema = Joi.object({
  name: name,
  amount: amount,
  description: description,
});

const findOneConsumableSchema = Joi.object({
  id: id.required(),
});

// const queryConsumableSchema = Joi.object({
//   limit,
//   offset,
//   price,
//   price_min,
//   price_max: price_max.when('price_min', {
//     is: price_min.required(),
//     then: Joi.required(),
//   }),
// });

module.exports = {
  createConsumableSchema,
  updateConsumableSchema,
  findOneConsumableSchema,
  // queryConsumableSchema,
};
