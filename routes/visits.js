const express = require('express');
let router = express.Router();

const authOwner = require('../middlewares/authOwner');
const visitController = require('../controllers/VisitsController');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret}),visitController.index)
    .post(visitController.create);

router.route('/:visit_id')
    .delete(visitController.find, authOwner, visitController.destroy)

module.exports = router;