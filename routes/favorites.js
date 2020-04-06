const express = require('express');
let router = express.Router();

const authOwner = require('../middlewares/authOwner');
const favController = require('../controllers/FavoritesController');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret}), favController.index)
    .post(favController.create);

router.route('/:id')
    .delete(favController.find, authOwner, favController.destroy)

module.exports = router;