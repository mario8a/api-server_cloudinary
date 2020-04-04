const mongoose = require('mongoose');

let favoriteSchema = new mongoose({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    }
});

const FavPlace = mongoose.model('FavPlace', favoriteSchema);

module.exports = FavPlace;