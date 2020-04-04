const express = require('express');

let router = express.Router();

const placesController = require('../controllers/PlacesController');

const authOwner = require('../middlewares/authOwner');

router.route('/')
    .get(placesController.index)
    .post(
            placesController.multerMiddlerware(),
            placesController.create, 
            placesController.saveImage)

      
router.route('/:id')
    .get(placesController.find, placesController.show)
      .put(placesController.find,authOwner,placesController.update)
      .delete(placesController.find,authOwner ,placesController.destroy);


module.exports = router;