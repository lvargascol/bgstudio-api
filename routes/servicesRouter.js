const express = require('express');
const ServicesService = require('../services/servicesServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createServiceSchema,
  updateServiceSchema,
  findOneServiceSchema,
} = require('../schemas/servicesSchema');

const router = express.Router();
const service = new ServicesService();

router.get('/', async (req, res, next) => {
  try {
    const services = await service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneServiceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const oneService = await service.findOne(id);
      res.status(200).json(oneService);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createServiceSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newService = await service.create(body);
      res.json(newService);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findOneServiceSchema, 'params'),
  validatorHandler(updateServiceSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedService = await service.update(id, body);
      res.json(updatedService);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findOneServiceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedService = await service.delete(id);
      res.json(deletedService);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
