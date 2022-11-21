const productSchema = require('../schemas/productSchema.js')
const boom = require('@hapi/boom')

function validatorHandler(schema, property) { /// Un middleware dinamico con un closure
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }) ///AbortEarly para que no se corte al
    ///Validar el primer error, valida todos los errores simultaneamente
    if(error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
