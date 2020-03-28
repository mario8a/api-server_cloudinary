const mongoose = require('mongoose');
const dbName = 'places_mario_api';

module.exports = {
    connect: ()=> mongoose.connect('mongodb://localhost:27017/'+ dbName),
    dbName,
    connection: () => {
        if(mongoose.connection)
            return mongoose.connection;
        return this.connect();
    }
}