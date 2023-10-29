const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string();
const lastName = Joi.string();
const phone = Joi.string().min(9);
const position = Joi.string();
const startedAt = Joi.date();
const birthday = Joi.date();
const active = Joi.boolean();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().valid('specialist');

const createSpecialistSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  position: position.required(),
  startedAt: startedAt.required(),
  birthday: birthday.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
  }),
});

const updateSpecialistSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  position: position,
  startedAt: startedAt,
  birthday: birthday,
  active: active,
  userId: userId,
});

const addServiceToSpecialist = Joi.object({
  specialistId: id.required(),
  serviceId: id.required(),
});

const findOneSpecialistSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSpecialistSchema,
  updateSpecialistSchema,
  findOneSpecialistSchema,
  addServiceToSpecialist,
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Specialist:
 *       type: object
 *       properties:
 *         id:
 *          type: integer
 *          description: specialist id
 *         firstName:
 *           type: string
 *           description: Specialist first name
 *           example: Maria
 *         lastName:
 *           type: string
 *           description: specialist last name
 *           example: Perez
 *         phone:
 *           type: string
 *           description: specialist phone
 *           example: +549 11223344
 *         position:
 *           type: string
 *           description: specialist position
 *           example: eyebrow artist
 *         startedAt:
 *           type: string
 *           format: date
 *           description: date when the specialist started
 *           example: 2022-01-01
 *         birthday:
 *           type: string
 *           format: date
 *           description: birthday of the specialist
 *           example: 1990-01-01
 *         active:
 *           type: boolean
 *           description: is the specialist currently working
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
 *               example: specialist
 *     CreateSpecialist:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: Specialist first name
 *           example: Maria
 *         lastName:
 *           type: string
 *           description: specialist last name
 *           example: Perez
 *         phone:
 *           type: string
 *           description: specialist phone
 *           example: +549 11223344
 *         position:
 *           type: string
 *           description: specialist position
 *           example: eyebrow artist
 *         startedAt:
 *           type: string
 *           format: date
 *           description: date when the specialist started
 *           example: 2022-01-01
 *         birthday:
 *           type: string
 *           format: date
 *           description: birthday of the specialist
 *           example: 1990-01-01
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
 *               example: specialist
 *           required:
 *             - firstName
 *             - lastName
 *             - phone
 *             - position
 *             - startedAt
 *             - birthday
 *             - user
 *     UpdateSpecialist:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: Specialist first name
 *           example: Maria
 *         lastName:
 *           type: string
 *           description: specialist last name
 *           example: Perez
 *         phone:
 *           type: string
 *           description: specialist phone
 *           example: +549 11223344
 *         position:
 *           type: string
 *           description: specialist position
 *           example: eyebrow artist
 *         startedAt:
 *           type: string
 *           format: date
 *           description: date when the specialist started
 *           example: 2022-01-01
 *         birthday:
 *           type: string
 *           format: date
 *           description: birthday of the specialist
 *           example: 1990-01-01
 *         active:
 *           type: boolean
 *           description: is the specialist currently working
 *         userID:
 *           type: integer
 *           description: user id
 *     AddServiceToSpecialist:
 *       type: object
 *       properties:
 *         specialistId:
 *          type: integer
 *          description: specialist id
 *         serviceID:
 *           type: integer
 *           description: service id
 */
