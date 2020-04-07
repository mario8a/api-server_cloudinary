const express = require('express');
let router = express.Router();

// const authenticateAdmin = require('../middlewares/authenticateAdmin');

const authenticateOwner = require('../middlewares/authOwner');
// const findUser = require('../middlewares/findUser');
const aplicationsController = require('../controllers/AplicationsController');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

// router.all('*',jwtMiddleware({secret: secrets.jwtSecret}),findUser,authenticateAdmin)

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret}),aplicationsController.index)
    .post(aplicationsController.create);

router.route('/:id')
    .delete(aplicationsController.find,aplicationsController.destroy)

module.exports = router;