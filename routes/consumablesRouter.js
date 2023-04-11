const express = require('express');
const ConsumablesService = require('../services/consumablesServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createConsumableSchema,
  updateConsumableSchema,
  findOneConsumableSchema,
  queryConsumableSchema,
} = require('../schemas/consumablesSchema');

const router = express.Router();
const service = new ConsumablesService();

router.get('/', async (req, res, next) => {
  try {
    const consumables = await service.find();
    res.status(200).json(consumables);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneConsumableSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const consumable = await service.findOne(id);
      res.status(200).json(consumable);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createConsumableSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newConsumable = await service.create(body);
      res.status(201).json(newConsumable);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findOneConsumableSchema, 'params'),
  validatorHandler(updateConsumableSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedConsumable = await service.update(id, body);
      res.json(updatedConsumable);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findOneConsumableSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedConsumable = await service.delete(id);
      res.json(deletedConsumable);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
