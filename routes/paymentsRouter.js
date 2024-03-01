const express = require('express');
const passport = require('passport');
const PaymentsService = require('../services/paymentsServices');
const OrdersService = require('../services/ordersServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createPaymentSchema,
  updatePaymentSchema,
  findOnePaymentSchema,
} = require('../schemas/paymentsSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new PaymentsService();
const orderService = new OrdersService();


router.get('/', 
passport.authenticate('jwt', { session: false }),
checkRoles(
  'admin',
  'manager',
  'specialist',
),
async (req, res, next) => {
  try {
    const payments = await service.find();
    res.status(200).json(payments);
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
  validatorHandler(findOnePaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await service.findOne(id);
      res.status(200).json(payment);
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
    'specialist',
  ),
  validatorHandler(createPaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPayment = await service.create(body);
      res.json(newPayment);
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
    'manager',
    'specialist',
  ),
  validatorHandler(findOnePaymentSchema, 'params'),
  validatorHandler(updatePaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body);
      await orderService.checkDeposit(updated.orderId);
      await orderService.checkTotallyPaid(updated.orderId);
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
  ),
  validatorHandler(findOnePaymentSchema, 'params'),
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
