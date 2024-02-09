const express = require('express');
const passport = require('passport');
const BookingsService = require('../services/bookingsServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createBookingSchema,
  updateBookingSchema,
  findOneBookingSchema,
  findBookingsByDateSchema,
  findBookingsByDateAndSpecialistSchema,
  findBookingsOnIntervalSchema,
  findBookingsOnIntervalBySpecialistSchema,
  addServiceSchema,
  addPromoSchema,
} = require('../schemas/bookingsSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new BookingsService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'specialist',
  ),
  async (req, res, next) => {
    try {
      const bookings = await service.find();
      res.status(200).json(bookings);
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
    'customer',
  ),
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

router.get(
  '/date/:date',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'specialist',
  ),
  validatorHandler(findBookingsByDateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { date } = req.params;
      const booking = await service.findByDate(date);
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/sales/:date',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findBookingsByDateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { date } = req.params;
      const sales = await service.findSalesByDate(date);
      res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/sales/:date/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findBookingsByDateAndSpecialistSchema, 'params'),
  async (req, res, next) => {
    try {
      const { date, id } = req.params;
      const sales = await service.findSalesByDateAndSpecialist(date, id);
      res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/sales/total/:start/:end',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findBookingsOnIntervalSchema, 'params'),
  async (req, res, next) => {
    try {
      const { start, end } = req.params;
      const totalSales = await service.findTotalSalesOnInterval(start, end);
      res.status(200).json(totalSales);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/sales/total/:start/:end/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findBookingsOnIntervalBySpecialistSchema, 'params'),
  async (req, res, next) => {
    try {
      const { start, end, id } = req.params;
      const totalSales = await service.findTotalSalesOnIntervalBySpecialist(start, end, id);
      res.status(200).json(totalSales);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/schedule/:date',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'specialist',
  ),
  validatorHandler(findBookingsByDateSchema, 'params'),
  async (req, res, next) => {
    try {
      const { date } = req.params;
      const schedule = await service.scheduleAvailability(date);
      res.status(200).json(schedule);
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
    'customer',
  ),
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

router.post(
  '/add-service/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'customer',
  ),
  validatorHandler(addServiceSchema, 'body'),
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
    'customer',
  ),
  validatorHandler(findOneBookingSchema, 'params'),
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

router.post(
  '/add-promo/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'customer',
  ),
  validatorHandler(addPromoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const addPromo = await service.addPromo(body);
      res.json(addPromo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/remove-promo/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'customer',
  ),
  validatorHandler(findOneBookingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const removed = await service.removePromo(id);
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
    'customer',
  ),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'customer',
  ),
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
