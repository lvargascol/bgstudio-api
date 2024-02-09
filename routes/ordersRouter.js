const express = require('express');
const passport = require('passport');
const OrdersService = require('../services/ordersServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createOrderSchema,
  updateOrderSchema,
  findOneOrderSchema,
  addItemSchema,
} = require('../schemas/ordersSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new OrdersService();

router.get('/', 
passport.authenticate('jwt', { session: false }),
checkRoles(
  'admin',
  'manager',
),
async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json(orders);
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
  validatorHandler(findOneOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
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
    'customer',
  ),  
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item', 
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
    'specialist',
    'customer',
  ),
  
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.json(newItem);
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
  validatorHandler(findOneOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedOrder = await service.update(id, body);
      res.json(updatedOrder);
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
  validatorHandler(findOneOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedOrder = await service.delete(id);
      res.json(deletedOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
