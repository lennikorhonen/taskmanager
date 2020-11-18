const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv/config');

const uri = process.env.DATABASE_URI
const dbname = 'task';

const state = {
    db: null
}
// cb == callback
const connect = (cb) => {
    // Tarkistetaan onko jo yhteys vai ei
    if (state.db) {
        cb();
    } else {

        MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbname);
                console.log('Connected to db')
                cb();
            }
        });
    }
};

// Id:n lukemista varten
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
};

// Kannan nimen hakua varten
const getDB = () => {
    return state.db;
};

module.exports = { connect, getPrimaryKey, getDB }