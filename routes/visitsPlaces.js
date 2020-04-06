const express = require('express');
let router = express.Router();

const authOwner = require('../middlewares/authOwner');
const visitsController = require('../controllers/VisitsController');
const placesController = require('../controllers/PlacesController');


router.route('/:id/visits')
    .get(placesController.find,visitsController.index)
    .post(placesController.find,visitsController.create);
// el id del negocio
router.route('/:id/visits/:visit_id')
    .delete(visitsController.find, authOwner, visitsController.destroy)

module.exports = router;