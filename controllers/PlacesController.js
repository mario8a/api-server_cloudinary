const Place = require('../models/Place');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');
const helpers = require('./helpers');

const validParams = [ "title", "description", "address", "acceptCreditCard", "openHour", "closeHour"];

function find(req,res,next) {
  Place.findOne({slug:req.params.id})
        .then(place => {
          req.place = place;
          next();
        }).catch(err => {
          next(err)
        });
}

function index(req,res) {
    // Todos los lugares
    //{paginate->criterios de busqueda} {json para la paginacion}
    // sort: el orden
    Place.paginate({},{page: req.query.page || 1, limit: 8, sort: {'_id': -1}})
        .then(docs => {
          res.json(docs);
        }).catch(err => {
          console.log(err);
          res.json(err)
        })
}

function create(req,res,next) {
// Crear los lugares
    let params = helpers.buildParams(validParams,req.body);
    Place.create(params).then(doc=>{
    req.place = doc;
    next();
  }).catch(err=>{
    next(err);
  })
}

function show(req,res) {
    // Busqueda individual
    res.json(req.place)
}

function update(req,res) {
    // Actualizar un lugar
    const params = helpers.buildParams(validParams,req.body);
    req.place = Object.assign(req.place,params);

    req.place.save().then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}


function destroy(req,res) {
    // Eliminar un lugar
    req.place.remove()
        .then(doc => {
          res.json({message: 'Lugar eliminado'});
        }).catch(err => {
          console.log(err);
          res.json(err)
        })
}

function multerMiddlerware() {
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1},

  ])
}

function saveImage(req,res) {
  if(req.place) {
    // definiendo cuantos timpos de archivos se pueden subir
    const files = ['avatar','cover'];
    const promises = [];
    files.forEach(imageType=> {
      if(req.files && req.files[imageType]){
        const path = req.files[imageType][0].path;
       promises.push( req.place.updateImage(path,imageType))
      }
    })

    Promise.all(promises).then(results => {
      console.log(results);
      res.json(req.place);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });

    
  } else {
    res.status(422).json({
      error: req.error || 'No se ha podido guardar el lugar'
    });
  }
}

module.exports = {index, create, show, update, destroy,find, multerMiddlerware, saveImage};