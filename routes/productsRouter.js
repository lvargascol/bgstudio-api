const express = require('express');
// const ProductsService = require('../services/productsServices');
// const { validatorHandler } = require('../middlewares/validatorHandler');
// const {
//   createProductSchema,
//   updateProductSchema,
//   findOneProductSchema,
//   queryProductSchema,
// } = require('../schemas/productSchema');

const router = express.Router();
// const service = new ProductsService();


router.get('/', (req, res) => {
  res.status(200).json({ 'ruta de prueba': 'products' });
});

// router.get(
//   '/',
//   validatorHandler(queryProductSchema, 'query'),
//   async (req, res, next) => {
//     try {
//       const products = await service.find(req.query);
//       res.json(products);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   '/:id',
//   validatorHandler(findOneProductSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const product = await service.findOne(id);
//       res.status(200).json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post(
//   '/',
//   validatorHandler(createProductSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newProduct = await service.create(body);
//       res.status(201).json(newProduct);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   const product = await service.updateAll(id, body);
//   res.json(product);
// });

// router.patch(
//   '/:id',
//   validatorHandler(findOneProductSchema, 'params'),
//   validatorHandler(updateProductSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const product = await service.update(id, body);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete(
//   '/:id',
//   validatorHandler(findOneProductSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const deleted = await service.delete(id);
//       res.json(deleted);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
