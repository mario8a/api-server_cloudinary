const jwt = require('jsonwebtoken');
const secretos = require('../config/secret');

const User = require('../models/User');

function authenticate(req,res,next) {

    User.findOne({email: req.body.email})
        .then(user => {
            user.verifyPassword(req.body.password)
                .then(valid  =>{
                    if(valid) {
                        req.user  = user;
                        next();
                    } else {
                        next(new Error('Credenciales invalidas'));
                    }
                })
        }).catch(err => next(err));

}

function generateToken(req,res,next){
    if(!req.user) return next();

    req.token = jwt.sign({id: req.user._id},secretos.jwtSecret);

    next();

}

function sendToken(req,res){
    if(req.user) {
        res.json({
            user: req.user,
            jwt: req.token
        })
    } else {
        res.status(400).json({
            error: 'No se pudo crear el usuario'
        })
    }
}

module.exports = {
    generateToken,
    sendToken,
    authenticate
}