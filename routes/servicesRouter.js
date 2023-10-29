const express = require('express');
const passport = require('passport');
const ServicesService = require('../services/servicesServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createServiceSchema,
  updateServiceSchema,
  findOneServiceSchema,
} = require('../schemas/servicesSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new ServicesService();

router.get('/',
  async (req, res, next) => {
    try {
      const services = await service.find();
      res.status(200).json(services);
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
  ),
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

/**
 * @openapi
 * /api/v1/services:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get all services
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *   post:
 *     tags:
 *       - Services
 *     summary: Create a new service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateService'
 *     responses:
 *       '200':
 *         description: Service created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 * /api/v1/services/{id}:
 *   get:
 *     tags:
 *       - Services
 *     summary: Get a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *   patch:
 *     tags:
 *       - Services
 *     summary: Update a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateService'
 *     responses:
 *       '200':
 *         description: Service updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *   delete:
 *     tags:
 *       - Services
 *     summary: Delete a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service ID
 *     responses:
 *       '200':
 *         description: Service deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Service successfully deleted
 *                 id:
 *                   type: integer
 *                   description: Service ID
 */
