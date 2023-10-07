const express = require('express');

const authRouter = require('./authRouter');
const bookingsRouter = require('./bookingsRouter');
const categoriesRouter = require('./categoriesRouter');
const consumablesRouter = require('./consumablesRouter');
const customersRouter = require('./customersRouter');
const ordersRouter = require('./ordersRouter');
const paymentsRouter = require('./paymentsRouter');
const productsRouter = require('./productsRouter');
const profileRouter = require('./profileRouter');
const promosRouter = require('./promosRouter');
const servicesRouter = require('./servicesRouter');
const specialistsRouter = require('./specialistsRouter');
const stocksRouter = require('./stocksRouter');
const usersRouter = require('./usersRouter');


function routersApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/bookings', bookingsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/consumables', consumablesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/payments', paymentsRouter);
  router.use('/products', productsRouter);
  router.use('/profile', profileRouter);
  router.use('/promos', promosRouter);
  router.use('/services', servicesRouter);
  router.use('/specialists', specialistsRouter);
  router.use('/stocks', stocksRouter);
  router.use('/users', usersRouter);
}

module.exports = routersApi;
