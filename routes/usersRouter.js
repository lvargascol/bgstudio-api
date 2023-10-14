const express = require('express');
const passport = require('passport');
const UsersService = require('../services/usersServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  updateUserSchema,
  findOneUserSchema,
} = require('../schemas/usersSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new UsersService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  passport.authenticate('jwt', { session: false }),
  validatorHandler(findOneUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
  ),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json(newUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
  ),
  validatorHandler(findOneUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
  ),
  validatorHandler(findOneUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
