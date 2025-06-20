const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// CORS manual
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // permite qualquer origem
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // pré-flight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date()
  }
  next()
})

server.use(router)
module.exports = server
