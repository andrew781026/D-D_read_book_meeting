// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const PORT = 3003

server.use(middlewares)
server.use(router)
server.listen(PORT, () => {
    console.log(`JSON Server is running at http://localhost:${PORT}`)
})