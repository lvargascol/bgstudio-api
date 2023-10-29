const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string().min(5);

const createNewPasswordSchema  = Joi.object({
  token: token.required(),
  newPassword: password.required(),
});

const recoveryPasswordSchema  = Joi.object({
  email: email.required(),
});


module.exports = { recoveryPasswordSchema , createNewPasswordSchema };

/** 
 * @openapi
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: user id
 *         email:
 *           type: string
 *           format: email
 *           description: user email
 *           example: example@mail.com
 *     RecoveryRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: user email
 *           example: example@mail.com
 *     ChangePasswordRequest:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: recovery token
 *           example: p4sSw0rDr3c0v3RyToKeN
 *         newPassword:
 *           type: string
 *           format: password
 *           description: user password
 *           example: password123
 */