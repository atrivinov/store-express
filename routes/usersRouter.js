const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  console.log(req.query)
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  } else {
    res.send('soy la ruta /users')
  }
})

module.exports = router
