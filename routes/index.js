////El home que configurara todas las rutas
const express = require('express')
const productsRouter = require('./productsRouter')
const usersRouter = require('./usersRouter')
const categoriesRouter = require('./categoriesRouter')

const routerApi = (app) => {
  const router = express.Router() //Una manera de manejar el ruteo de versiones de api
  /// todas las rutas parten de /api/v1 y por eso se manejan con router y no app
  app.use('/', (req,res) => {
    res.send('Puedes visitar los endpoints: /api/v1/products , /api/v1/users, /api/v1/categories')
  })
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter)
}

module.exports = routerApi
