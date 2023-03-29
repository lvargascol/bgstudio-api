const express = require('express');
// const CategoriesService = require('../services/categoriesServices');
// const { validatorHandler } = require('../middlewares/validatorHandler');
// const { createCategorySchema, updateCategorySchema, findOneCategorySchema } = require('../schemas/categorySchema');

const router = express.Router();
// const service = new CategoriesService();

router.get('/', (req, res) => {
  res.status(200).json({ 'ruta de prueba': 'categories' });
});

// router.get('/',async (req,res) => {
//   const products = await service.find();
//   res.json(products);
// });

// router.get('/:id',
//   validatorHandler(findOneCategorySchema,'params'),
//   async (req,res,next) => {
//     try {
//       const { id } = req.params;
//       const product = await service.findOne(id);
//       res.status(200).json(product);
//       } catch (error) {
//         next(error);
//     }
//   }
// );

// router.post('/',
//   validatorHandler(createCategorySchema,'body'),
//   async (req,res) => {
//     const body = req.body;
//     const newCategory = await service.create(body);
//     res.status(201).json(newCategory);
//   }
// );

// router.put('/:id', async (req,res) => {
//   const {id} = req.params;
//   const body = req.body;
//   const product = await service.updateAll(id,body);
//   res.json(product);
// });

// router.patch('/:id',
//   validatorHandler(findOneCategorySchema,'params'),
//   validatorHandler(updateCategorySchema,'body'),
//   async (req,res,next) => {
//     try {
//       const {id} = req.params;
//       const body = req.body;
//       const product = await service.update(id,body);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete('/:id', async (req,res) => {
//   const {id} = req.params;
//   const deleted = await service.delete(id);
//   res.json(deleted);
// });



module.exports = router;
