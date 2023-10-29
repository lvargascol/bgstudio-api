const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const findOneUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, findOneUserSchema };

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *          type: integer
 *          description: user id
 *         email:
 *           type: string
 *           format: email
 *           description: user email
 *           example: example@mail.com
 *         role:
 *           type: string
 *           description: user role
 *           example: customer
 *     CreateUser:
 *       type: object 
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: user email
 *           example: example@mail.com
 *         password:
 *           type: string
 *           format: password
 *           description: user password
 *           example: password123
 *         role:
 *           type: string
 *           description: user role
 *           example: customer
 *       required:
 *         - email
 *         - password
 *         - role
 *     UpdateUser:
 *       type: object 
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: user email
 *           example: example@mail.com
 *         password:
 *           type: string
 *           format: password
 *           description: user password
 *           example: password123
 *           minLength: 8
 *         role:
 *           type: string
 *           description: user role
 *           example: customer
*/
