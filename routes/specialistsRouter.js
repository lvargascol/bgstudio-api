const express = require('express');
const passport = require('passport');
const SpecialistsService = require('../services/specialistsServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createSpecialistSchema,
  updateSpecialistSchema,
  findOneSpecialistSchema,
  addServiceToSpecialist,
} = require('../schemas/specialistsSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router();
const service = new SpecialistsService();

router.get('/',
  async (req, res, next) => {
    try {
      const specialists = await service.find();
      res.status(200).json(specialists);
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
  validatorHandler(findOneSpecialistSchema, 'params'),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
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

router.delete(
  '/remove-service/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
    'manager',
  ),
  validatorHandler(findOneSpecialistSchema, 'params'),
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
  validatorHandler(findOneSpecialistSchema, 'params'),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(
    'admin',
  ),
  validatorHandler(findOneSpecialistSchema, 'params'),
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
 * /api/v1/specialists:
 *   get:
 *     tags: 
 *       - Specialists
 *     summary: Get all specialists 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Specialist'
 *   post:
 *     tags: 
 *       - Specialists
 *     summary: Create a new Specialist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSpecialist'
 *     responses:
 *       200:
 *         description: Specialist created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialist'
 * /api/v1/specialists/add-service:
 *   post:
 *     tags: 
 *       - Specialists
 *     summary: Add Service to Specialist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddServiceToSpecialist'
 *     responses:
 *       200:
 *         description: Service added  to Specialist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Service successfully added to Specialist  
 * /api/v1/specialists/remove-service/{id}:
 *   delete:
 *     tags: 
 *       - Specialists
 *     summary: Remove a Service from Specialist by Specialist-Service ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Specialist-Service ID
 *     responses:
 *       200:
 *         description: Service removed from Specialist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Service successfully removed from Specialist
 *                 id:
 *                   type: integer
 *                   description: Specialist-Service id
 * /api/v1/specialists/{id}:
 *   get:
 *     tags: 
 *       - Specialists
 *     summary: Get an Specialist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Specialist ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialist'
 *   patch:
 *     tags: 
 *       - Specialists
 *     summary: Update an Specialist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Specialist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSpecialist'
 *     responses:
 *       200:
 *         description: Specialist updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialist'
 *   delete:
 *     tags: 
 *       - Specialists
 *     summary: Delete an Specialist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Specialist ID
 *     responses:
 *       200:
 *         description: Specialist deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: message
 *                   default: Specialist successfully deleted
 *                 id:
 *                   type: integer
 *                   description: Specialist id
 */