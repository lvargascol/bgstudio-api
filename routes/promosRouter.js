const express = require('express');
const passport = require('passport');
const PromosService = require('../services/promosServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createPromoSchema,
  updatePromoSchema,
  findOnePromoSchema,
  addServiceToPromo,
} = require('../schemas/promosSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new PromosService();

router.get('/',
  async (req, res, next) => {
    try {
      const promos = await service.find();
      res.status(200).json(promos);
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
  validatorHandler(findOnePromoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const promo = await service.findOne(id);
      res.status(200).json(promo);
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
  validatorHandler(createPromoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPromo = await service.create(body);
      res.json(newPromo);
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
  ),
  validatorHandler(addServiceToPromo, 'body'),
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
  ),
  validatorHandler(findOnePromoSchema, 'params'),
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

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findOnePromoSchema, 'params'),
  validatorHandler(updatePromoSchema, 'body'),
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
  ),
  validatorHandler(findOnePromoSchema, 'params'),
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
 * /api/v1/promos:
 *   get:
 *     tags:
 *       - Promos
 *     summary: Get all promotions
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promo'
 *   post:
 *     tags:
 *       - Promos
 *     summary: Create a new promotion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePromo'
 *     responses:
 *       '200':
 *         description: Promotion created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promo'
 * /api/v1/promos/add-service:
 *   post:
 *     tags:
 *       - Promos
 *     summary: Add a service to a promotion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddServiceToPromo'
 *     responses:
 *       '200':
 *         description: Service added to promotion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Service successfully added to promotion
 * /api/v1/promos/remove-service/{id}:
 *   delete:
 *     tags: 
 *       - Promos
 *     summary: Remove a Service from Promo by Promo-Service ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Promo-Service ID
 *     responses:
 *       '200':
 *         description: Service removed from Promo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Service successfully removed from promotion
 *                 id:
 *                   type: integer
 *                   description: Promo-Service id
 * /api/v1/promos/{id}:
 *   get:
 *     tags:
 *       - Promos
 *     summary: Get a promotion by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Promotion ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promo'
 *   patch:
 *     tags:
 *       - Promos
 *     summary: Update a promotion by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Promotion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePromo'
 *     responses:
 *       '200':
 *         description: Promotion updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promo'
 *   delete:
 *     tags:
 *       - Promos
 *     summary: Delete a promotion by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Promotion ID
 *     responses:
 *       '200':
 *         description: Promotion deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Promotion successfully deleted
 *                 id:
 *                   type: integer
 *                   description: Promotion ID
 */
