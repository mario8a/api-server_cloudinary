const Application = require('./models/Aplication');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');

const places = require('./routes/places');
const users = require('./routes/users');
const sessions  = require('./routes/sessions');
const favorites = require('./routes/favorites');
const visits = require('./routes/visits');
const visitsPlaces = require('./routes/visitsPlaces');
const applications = require('./routes/aplications');

//Middlewares
const findAppBySecret = require('./middlewares/findAppBySecret');
const authApp  = require('./middlewares/authApp')();

const db = require('./config/database');
const secrets = require('./config/secret');



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

//USANDO LOS MIDLEWARES/ Teniendo ya una app se debera enviar el secret para consultas
app.use(findAppBySecret);
app.use(authApp.unless({method: 'OPTIONS'}));

app.use(
  jwtMiddleware({secret: secrets.jwtSecret})
      .unless({path: ['/sessions','/users'], method: ['GET','OPTIONS']})
)

app.use('/places', places);
app.use('/places', visitsPlaces);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/favorites', favorites);
app.use('/visits', visits);
app.use('/applications', applications)

//demo para eliminar todas las apps
// app.use('/demo',function(req,res){
//   Application.remove({}).then(r => res.json({message: 'Aplicacion eliminada'}))
// })


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
