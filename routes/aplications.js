const express = require('express');
let router = express.Router();

const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');

// const authenticateOwner = require('../middlewares/authOwner');
const aplicationsController = require('../controllers/AplicationsController');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.all('*',jwtMiddleware({secret: secrets.jwtSecret}),findUser,authenticateAdmin)

router.route('/')
    .get(aplicationsController.index)
    .post(aplicationsController.create);

router.route('/:id')
    .delete(aplicationsController.find,aplicationsController.destroy)

module.exports = router;