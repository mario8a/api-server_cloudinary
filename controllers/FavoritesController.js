const buildParams = require('./helpers').buildParams;

const validParams = ['_place'];

const FavPlace = require('../models/favPlace');
const User = require('../models/User');

function find(req,res,next) {
    FavPlace.findById(req.params.id).then(fav => {
        req.mainObj = fav;
        req.favorite = fav;
        next()
    }).catch(next);
}

function index(req,res) {
    //req.user No puede entrar cualquier usuario a menos que sea valido
    User.findOne({'_id': req.user.id}).then(user => {
        user.favorites.then(places => {
            res.json(places);
        })
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function create(req,res) {
    let params = buildParams(validParams, req.body);
    params['_user'] = req.user.id;

    FavPlace.create(params)
        .then(favorite => {
            res.json(favorite)
        }).catch(error => {
            res.status(422).json(error);
        })
}

function destroy(req,res) {
    req.favorite.remove().then(doc => {
        res.json({})
    }).catch(error => {
        res.status(500).json(error)
    })
}


module.exports = {
    create,
    find,
    destroy,
    index
}