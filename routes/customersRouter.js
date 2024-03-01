const express = require('express');
const passport = require('passport');
const CustomersService = require('../services/customersServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  findOneCustomerSchema,
} = require('../schemas/customersSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new CustomersService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  async (req, res, next) => {
    try {
      const customers = await service.find();
      res.status(200).json(customers);
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
  ),
  validatorHandler(findOneCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id,req.user);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.json(newCustomer);
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
  validatorHandler(findOneCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
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
  ),
  validatorHandler(findOneCustomerSchema, 'params'),
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

/** 
 * @openapi
 * /api/v1/customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get all customers
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *   post:
 *     tags:
 *       - Customers
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomer'
 *     responses:
 *       '200':
 *         description: Customer created
 *         content:
 *           application/json:
 *              schema:
 *               $ref: '#/components/schemas/Customer'
 * /api/v1/customers/{id}:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Customer ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer' 
 *   patch:
 *     tags:
 *       - Customers
 *     summary: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomer'
 *     responses:
 *       '200':
 *         description: Customer updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *   delete:
 *     tags:
 *       - Customers
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       '200':
 *         description: Customer deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Customer successfully deleted
 *                 id:
 *                   type: integer
 *                   description: Customer ID
 */
