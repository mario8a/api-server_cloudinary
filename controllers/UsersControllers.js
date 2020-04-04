const User = require('../models/User');

const buildParams  = require('./helpers').buildParams;

const validParams = ['email','name', 'password'];


function create(req,res,next) {
    let params = buildParams(validParams,req.body);
    User.create(params)
        .then(user => {
            req.user = user;
            next();
            // res.json(user)
        }).catch(error => {
            console.log(error);
            res.json(422).json({
                error
            })
        })
}

function myPlaces(req, res) {
    User.findOne({'_id': req.user.id}).then(user => {
        user.places.then(places => {
            res.json(places);
        })
    }).catch(err => {
        res.json(err);
    })
}

function destroyAll(req,res) {
    User.remove({}).then(r => res.json({}));
}

module.exports = {create, myPlaces ,destroyAll}