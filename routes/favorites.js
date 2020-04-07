const express = require('express');
let router = express.Router();

const authOwner = require('../middlewares/authOwner');
//add
const findUser = require('../middlewares/findUser');

const favController = require('../controllers/FavoritesController');


const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret}),findUser ,favController.index)
    .post(favController.create);

router.route('/:id')
    .delete(favController.find, authOwner, favController.destroy)

module.exports = router;