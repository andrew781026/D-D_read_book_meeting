const express = require('express')
const fs = require('fs')
const path = require('path')
const pathToSwaggerUi = require('swagger-ui-dist').getAbsoluteFSPath()

const indexContent = fs.readFileSync(path.join(pathToSwaggerUi, 'swagger-initializer.js'))
  .toString()
  .replace('https://petstore.swagger.io/v2/swagger.json', '/path/to/swagger.json')

const app = express()
app.get('/swagger-initializer.js', (req, res) => res.send(indexContent))
app.use('/path/to/swagger.json', express.static(path.join(__dirname, 'swagger.json')))
app.use(express.static(pathToSwaggerUi))

app.listen(8011)