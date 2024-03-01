const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string();
const lastName = Joi.string();
const phone = Joi.string().min(9);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().default('customer');

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password,
  }),
});

const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  userId: userId, //*
});

const findOneCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  findOneCustomerSchema,
};
/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *          type: integer
 *          description: customer id
 *         firstName:
 *           type: string
 *           description: customer first name
 *           example: Maria
 *         lastName:
 *           type: string
 *           description: customer last name
 *           example: Perez
 *         phone:
 *           type: string
 *           description: customer phone
 *           example: +549 11223344
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: user id
 *             email:
 *               type: string
 *               format: email
 *               description: user email
 *               example: example@mail.com
 *             role:
 *               type: string
 *               description: user role
 *               example: customer
 *     CreateCustomer:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: customer first name
 *           example: Maria
 *         lastName:
 *           type: string
 *           description: customer last name
 *           example: Perez
 *         phone:
 *           type: string
 *           description: customer phone
 *           example: +549 11223344
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: user email
 *               example: example@mail.com
 *             password:
 *               type: string
 *               format: password
 *               description: user password
 *               example: password123
 *             role:
 *               type: string
 *               description: user role
 *               example: customer
 *     UpdateCustomer:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phone:
 *           type: string
 *         userId:
 *           type: integer
 */ 
