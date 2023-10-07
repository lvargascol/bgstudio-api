const express = require('express');
const SpecialistsService = require('../services/specialistsServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createSpecialistSchema,
  updateSpecialistSchema,
  findOneCSpecialistSchema,
  addServiceToSpecialist,
} = require('../schemas/specialistsSchema');

const router = express.Router();
const service = new SpecialistsService();

router.get('/', async (req, res, next) => {
  try {
    const specialists = await service.find();
    res.status(200).json(specialists);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneCSpecialistSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const specialist = await service.findOne(id);
      res.status(200).json(specialist);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createSpecialistSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSpecialist = await service.create(body);
      res.json(newSpecialist);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-service/',
  validatorHandler(addServiceToSpecialist, 'body'),
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

router.patch(
  '/:id',
  validatorHandler(findOneCSpecialistSchema, 'params'),
  validatorHandler(updateSpecialistSchema, 'body'),
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
  validatorHandler(findOneCSpecialistSchema, 'params'),
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

router.delete(
  '/remove-service/:id',
  validatorHandler(findOneCSpecialistSchema, 'params'),
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

module.exports = router;
