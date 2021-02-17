// server.js
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const PORT = 3003

server.use(middlewares)
server.use(router)
server.listen(PORT, () => {
    console.log(`JSON Server is running at http://localhost:${PORT}`)
})
