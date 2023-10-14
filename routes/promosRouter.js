const express = require('express');
const passport = require('passport');
const PromosService = require('../services/promosServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createPromoSchema,
  updatePromoSchema,
  findOnePromoSchema,
  addServiceToPromo,
} = require('../schemas/promosSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new PromosService();

router.get('/',
  async (req, res, next) => {
    try {
      const promos = await service.find();
      res.status(200).json(promos);
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
    'specialist',
  ),
  validatorHandler(findOnePromoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const promo = await service.findOne(id);
      res.status(200).json(promo);
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
    'manager',
  ),
  validatorHandler(createPromoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPromo = await service.create(body);
      res.json(newPromo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/add-service/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(addServiceToPromo, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const addService = await service.addService(body);
      res.json(addService);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/remove-service/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findOnePromoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const removed = await service.removeService(id);
      res.json(removed);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findOnePromoSchema, 'params'),
  validatorHandler(updatePromoSchema, 'body'),
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
  validatorHandler(findOnePromoSchema, 'params'),
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
