const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(45);
const price = Joi.number().integer().min(1000);
const minutes = Joi.number().integer().min(5).max(300);
const image = Joi.string().uri();
const description = Joi.string();
const active = Joi.boolean();
const categoryId = Joi.number().integer();

const createServiceSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  minutes: minutes.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});


const updateServiceSchema = Joi.object({
  name: name,
  price: price,
  minutes: minutes,
  image: image,
  description: description,
  active: active,
  categoryId: categoryId,
});

const findOneServiceSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
  findOneServiceSchema,
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Service id
 *         name:
 *           type: string
 *           description: Service name
 *           example: Service n°1
 *         price:
 *           type: integer
 *           description: Service price
 *           example: 70
 *         minutes:
 *           type: integer
 *           description: time in minutes required for the service
 *           example: 5
 *         image:
 *           type: string
 *           description: Service image
 *           example: https://example.img
 *         description:
 *           type: string
 *           description: Service detailed description
 *           example: This service description
 *         active:
 *           type: boolean
 *           description: is this service currently available
 *         categoryId:
 *           type: integer
 *           description: Category id
 *     CreateService:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Service name
 *           example: Service n°1
 *         price:
 *           type: integer
 *           description: Service price
 *           example: 70
 *         minutes:
 *           type: integer
 *           description: time in minutes required for the service
 *           example: 5
 *         image:
 *           type: string
 *           description: Service image
 *           example: https://example.img
 *         description:
 *           type: string
 *           description: Service detailed description
 *           example: This service description
 *         categoryId:
 *           type: integer
 *           description: Category id
 *     UpdateService:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Service name
 *           example: Service n°1
 *         price:
 *           type: integer
 *           description: Service price
 *           example: 70
 *         minutes:
 *           type: integer
 *           description: time in minutes required for the service
 *           example: 5
 *         image:
 *           type: string
 *           description: Service image
 *           example: https://example.img
 *         description:
 *           type: string
 *           description: Service detailed description
 *           example: This service description
 *         active:
 *           type: boolean
 *           description: is this service currently available
 *         categoryId:
 *           type: integer
 *           description: Category id
 */
