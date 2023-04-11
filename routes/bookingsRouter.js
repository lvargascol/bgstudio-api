const express = require('express');
const BookingsService = require('../services/bookingsServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createBookingSchema,
  updateBookingSchema,
  findOneBookingSchema,
} = require('../schemas/bookingsSchema');

const router = express.Router();

const service = new BookingsService();

router.get('/', async (req, res, next) => {
  try {
    const bookings = await service.find();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneBookingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await service.findOne(id);
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createBookingSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBooking = await service.create(body);
      res.json(newBooking);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findOneBookingSchema, 'params'),
  validatorHandler(updateBookingSchema, 'body'),
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
  validatorHandler(findOneBookingSchema, 'params'),
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
