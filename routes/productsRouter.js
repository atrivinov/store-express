const express = require('express');

const ProductsService = require('./../services/productsService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema')

const router = express.Router()
const service = new ProductsService()



router.get('/', async (req, res) => { /// seria /products el home de este controller
  const products = await service.find()
  res.json(products)
})

///Correspondiente a /products/filter
// router.get('/filter', (req, res) => { ///Endpoint especificos deben ir antes de endpoint dinamicos
//   res.send('yo soy un filtro')
// })

///Correspondiente a /products/:id
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {  /// como este aqui debo destructurarlo y tomarlo de la request
    try {
      const { id } = req.params;
      const product = await service.findOne(id)
      res.json(product)
    }
    catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
validatorHandler(getProductSchema, 'params'), /// Validamos primero id con primer midd
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.status(200).json(product)
    }
    catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'), // validamos luego el body con segundo mid
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id)
  res.json(product)
})

///Aqui estamos separando responsabilidades, SRP
module.exports = router
