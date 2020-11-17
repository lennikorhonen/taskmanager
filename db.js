const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv/config');
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URI
const dbname = 'task';

const state = {
    db: null
}

const connect = (cb) => {
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

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
};

const getDB = () => {
    return state.db;
};

module.exports = { connect, getPrimaryKey, getDB }