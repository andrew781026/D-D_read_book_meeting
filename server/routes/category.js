var express = require('express');
var router = express.Router();
const pool = require('../database');
/* GET home page. */
router.get('/', function(req, res, next) {
    pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT 1 as val")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "
        //   return "test"
        //   return conn.query("IINSERT INTO category (name) VALUES ('test')");
          return conn.query("SELECT * FROM category");
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
    }).catch(err => {
      //not connected
    });
});
module.exports = router;
