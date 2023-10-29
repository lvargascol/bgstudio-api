const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(45);
const price = Joi.number().integer().min(1000);
const minutes = Joi.number().integer().min(5).max(300);
const image = Joi.string().uri();
const active = Joi.boolean();
const description = Joi.string();

const createPromoSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  minutes: minutes.required(),
  description: description.required(),
  image: image,  
});

const addServiceToPromo = Joi.object({
  promoId: id.required(),
  serviceId: id.required(),
});


const updatePromoSchema = Joi.object({
  name: name,
  price: price,
  minutes: minutes,
  image: image,
  description: description,
  active: active,
});

const findOnePromoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPromoSchema,
  updatePromoSchema,
  findOnePromoSchema,
  addServiceToPromo,
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Promo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: promotion id
 *         name:
 *           type: string
 *           description: promotion name
 *           example: Promotion n°1
 *         price:
 *           type: integer
 *           description: promotion price
 *           example: 150
 *         minutes:
 *           type: integer
 *           description: time in minutes required for the promotion services
 *           example: 15
 *         image:
 *           type: string
 *           description: promotion image
 *           example: https://example.img
 *         description:
 *           type: string
 *           description: promotion detailed description
 *           example: This promotion description
 *         active:
 *           type: boolean
 *           description: is this promotion currently available
 *     CreatePromo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: promotion name
 *           example: Promotion n°1
 *         price:
 *           type: integer
 *           description: promotion price
 *           example: 150
 *         minutes:
 *           type: integer
 *           description: time in minutes required for the promotion services
 *           example: 15
 *         image:
 *           type: string
 *           description: promotion image
 *           example: https://example.img
 *         description:
 *           type: string
 *           description: promotion detailed description
 *           example: This promotion description
 *     UpdatePromo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: promotion name
 *           example: Promotion n°1
 *         price:
 *           type: integer
 *           description: promotion price
 *           example: 150
 *         minutes:
 *           type: integer
 *           description: time in minutes required for the promotion services
 *           example: 15
 *         image:
 *           type: string
 *           description: promotion image
 *           example: https://example.img
 *         description:
 *           type: string
 *           description: promotion detailed description
 *           example: This promotion description
 *         active:
 *           type: boolean
 *           description: is this promotion currently available
 *     AddServiceToPromo:
 *       type: object
 *       properties:
 *         promoId:
 *           type: integer
 *           description: promotion id
 *         serviceId:
 *           type: integer
 *           description: service id
 */
