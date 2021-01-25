var express = require('express');
var router = express.Router();
const usersController = require('../controllers/index').users;

/* GET home page. */
router.get('/', function(req, res, next) {
  usersController.list(req,res)
});
module.exports = router;
