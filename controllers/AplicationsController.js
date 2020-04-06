const buildParams = require('./helpers').buildParams;

const validParams = ['origins', 'name'];

const Aplication = require('../models/Aplication');

function find(req,res,next) {
    Aplication.findById(req.params.id).then(aplication => {
        req.mainObj = aplication;
        req.aplication = aplication;
        next()
    }).catch(next);
}

function index(req,res) {

}

function create(req,res){
    let params = buildParams(validParams,req.body);
  
    Aplication.create(params)
      .then(application=>{
        res.json(application);
      }).catch(error=>{
        res.status(422).json({error});
      })
  }
  

function destroy(req,res) {
    req.aplication.remove().then(doc => {
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