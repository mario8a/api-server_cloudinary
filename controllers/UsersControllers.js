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

function destroyAll(req,res) {
    User.remove({}).then(r => res.json({}));
}

module.exports = {create, destroyAll}