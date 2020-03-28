var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

const places = require('./routes/places');

const db = require('./config/database');


db.connect().then(() => {
  console.log('conexión a la base de datos online');
}).catch(err => {
  console.log('Error en DB');
})
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/places', places)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status(404)
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
