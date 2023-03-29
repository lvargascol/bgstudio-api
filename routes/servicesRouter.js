const express = require('express');
const ServicesService = require('../services/servicesServices');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createServiceSchema,
  updateServiceSchema,
  findOneServiceSchema,
} = require('../schemas/servicesSchema');

const router = express.Router();
const service = new ServicesService();

//Logica temporal

// router.get('/', (req, res) => {
//   res.status(200).json({ 'ruta de prueba': 'services' });
// });

// router.post('/', (req, res) => {
//   const body = req.body;
//   res.status(200).json({ 'message': 'created' , 'data': body })

// });

// router.patch('/:id', (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   res.status(200).json({ message: 'updated', data: body , id: id });
// });

// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   res.status(200).json({ message: 'deleted', id: id });
// });

//Logica "definitiva"

router.get('/', async (req, res) => {
  const services = await service.find();
  res.status(200).json(services);
});

router.get(
  '/:id',
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
  validatorHandler(findOneServiceSchema, 'params'),
  validatorHandler(updateServiceSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newService = await service.update(id, body);
      res.json(newService);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findOneServiceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
