const express = require('express');
const UsersService = require('../services/usersServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  updateUserSchema,
  findOneUserSchema,
} = require('../schemas/usersSchema');

const router = express.Router();
const service = new UsersService();

// router.get('/', (req, res) => {
//   res.status(200).json({ 'ruta de prueba': 'users' });
// });

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json(newUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.patch(
  '/:id',
  validatorHandler(findOneUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
  validatorHandler(findOneUserSchema, 'params'),
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
