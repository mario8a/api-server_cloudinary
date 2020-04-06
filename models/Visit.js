const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const REACTIONS = ['like', 'love', 'disappointment', 'yummy', 'anger', 'disgust'];

// los enum sirven para definir una colecciond e datos validos para ese ampo
//enum son valores predefinidos para un campo enum reibe un arregl
let VisitShema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    reaction: {
        type: String,
        enum: REACTIONS
    },
    observation: String
})

//ordena las visitas segun su id de mayor a menor visitas 
VisitShema.statics.forUser = function(userId, page) {
    return Visit.paginate({'_user': userId}, {page: page, limit: 5, sort: {'_id': -1}});
}

VisitShema.plugin(mongoosePaginate);

const Visit = mongoose.model('Visit', VisitShema);

module.exports = Visit;