const express = require('express');
const StocksService = require('../services/stocksServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createStockSchema,
  updateStockSchema,
  findOneStockSchema,
  addConsumableSchema,
  addProductSchema,
} = require('../schemas/stocksSchema');

const router = express.Router();
const service = new StocksService();

router.get('/', async (req, res, next) => {
  try {
    const stocks = await service.find();
    res.status(200).json(stocks);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneStockSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const oneStock = await service.findOne(id);
      res.status(200).json(oneStock);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createStockSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newStock = await service.create(body);
      res.json(newStock);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-consumable',
  validatorHandler(addConsumableSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addConsumable(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-product',
  validatorHandler(addProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addProduct(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findOneStockSchema, 'params'),
  validatorHandler(updateStockSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedStock = await service.update(id, body);
      res.json(updatedStock);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findOneStockSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedStock = await service.delete(id);
      res.json(deletedStock);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
