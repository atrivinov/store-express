const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('hola desde categories')
})

router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params
    res.json({
      categoryId,
      productId
    })
})

module.exports = router
