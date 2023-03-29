const express = require('express');

const bookingsRouter = require('./bookingsRouter');
const categoriesRouter = require('./categoriesRouter');
const customersRouter = require('./customersRouter');
const ordersRouter = require('./ordersRouter');
const paymentsRouter = require('./paymentsRouter');
const productsRouter = require('./productsRouter');
const promosRouter = require('./promosRouter');
const servicesRouter = require('./servicesRouter');
const specialistsRouter = require('./specialistsRouter');
const usersRouter = require('./usersRouter');

function routersApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/bookings', bookingsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/payments', paymentsRouter);
  router.use('/products', productsRouter);
  router.use('/promos', promosRouter);
  router.use('/services', servicesRouter);
  router.use('/specialists', specialistsRouter);
  router.use('/users', usersRouter);
}

module.exports = routersApi;
