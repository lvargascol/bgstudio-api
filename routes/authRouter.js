const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const { validatorHandler } = require('../middlewares/validatorHandler');
const { recoveryPasswordSchema, createNewPasswordSchema } = require('./../schemas/authSchema');
const AuthService = require('./../services/authService');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();

const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.json(service.signToken(req.user));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'specialist',
    // 'customer',
    // 'guest'
  ),
  async (req, res, next) => {
    try {
      const user = await service.getProfile(req.user.sub);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);  

router.post(
  '/recovery',
  validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecovery(email);
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/change-password',
  validatorHandler(createNewPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: login token
 *                   example: l0gInToKeN
 * /api/v1/auth/profile:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get user profile
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 * /api/v1/auth/recovery:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Request password recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecoveryRequest'
 *     responses:
 *       '200':
 *         description: Recovery request sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Recovery email sent
 * /api/v1/auth/change-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       '200':
 *         description: Password changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Password successfully changed
 */
