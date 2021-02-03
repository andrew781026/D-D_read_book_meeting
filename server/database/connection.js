const knex = require('knex')({
     client: 'mysql',
     connection: {
       host : 'db',
       user : 'booker',
       password : '20210125',
       database : 'book_club'
     }
   });

module.exports = knex;