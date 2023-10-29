const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image,
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
});

const findOneCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  findOneCategorySchema,
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: category id
 *         name:
 *           type: string
 *           description: category name
 *           example: category
 *         image:
 *           type: string
 *           description: category image
 *           example: https://example.img
 *     CreateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category name
 *           example: category
 *         image:
 *           type: string
 *           description: category image
 *           example: https://example.img
 *     UpdateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category name
 *           example: category
 *         image:
 *           type: string
 *           description: category image
 *           example: https://example.img
 */