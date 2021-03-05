const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


router.use('/api_docs', swaggerUi.serve);
router.get('/api_docs', swaggerUi.setup(swaggerDocument));

module.exports = router;