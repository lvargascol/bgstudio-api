const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(45);
const price = Joi.number().integer().min(1000);
const minutes = Joi.number().integer().min(5).max(300);
const image = Joi.string().uri();
const description = Joi.string();

const createPromoSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  minutes: minutes.required(),
  image: image.required(),
  description: description.required(),
});

const updatePromoSchema = Joi.object({
  name: name,
  price: price,
  minutes: minutes,
  image: image,
  description: description,
});

const findOnePromoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPromoSchema,
  updatePromoSchema,
  findOnePromoSchema,
};