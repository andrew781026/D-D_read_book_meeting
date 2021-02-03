var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const knex = require('./database/connection');
const { Model } = require('objection');
const { Category } = require('./models/category');


// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

async function main() {
  // Delete all persons from the db.
  await Category.query().delete();

  // Insert one row to the database.
  await Category.query().insert({
    name: 'Jennifer',
  });

  // Read all rows from the db.
  const people = await Category.query();
  console.log(people);
}

main()
  .then(() => knex.destroy())
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });




const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const basicAuth = require('express-basic-auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Book Club",
      version: "1.0.0",
      description: 'Book Club API',
      contact: {
        name: 'Cai Ci Jhan',
        email: 'ordinarycas@gmail.com',
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpecs = swaggerJsdoc(options);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
