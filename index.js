const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express();
const port = 3000;

app.use(express.json()); ///middleware por defecto en express

const whiteList = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)) {
      callback(null, true)
    } else
    {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options)); ///cors() acepta cualquier dominio
///cors para aceptar cualquier dominio que desee consumir nuestra api

app.get('/', (req, res) => { //Ruta por defecto o home
  res.send('Hola mundo')
})

routerApi(app)

/////Los middlewares se usan despues del routing
///En el orden que se definan se ejecutan
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('todo ok en puerto ' + port)
})
