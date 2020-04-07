const Application = require('../models/Aplication');

module.exports = function(req,res,next){
  // let AuthApp = function (req,res,next){
    //console.log(req.headers.application);
    Application.count({}).then(appCount=>{
      if(appCount > 0 && !req.application) return next(new Error('An application is required to consume this API.'));

      req.validApp = true;
      // if(!req.validRequest) return next(new Error('Origin Invalid'));

      next();
    }).catch(next);
  // }

  // AuthApp.unless = require('express-unless');

  // return AuthApp;
}