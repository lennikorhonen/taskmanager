const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config');
const cors = require('cors');

const db = require('./db');
const collection = 'data'

const app = express();
app.use(cors())
app.use(bodyParser.json())

// Näytä kaikki taskit
app.get('/', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.error(err);
        } else {
            res.json(documents);
        }
    });
});

// Näytä taskit tietyn tagin perusteella
app.get('/:tag', (req, res) => {
    const tag = req.params.tag

    db.getDB().collection(collection).find({ tag: tag },).toArray((err, documents) => {
        if (err) {
            console.error(err);
        } else {
            res.json(documents)
        }
    })
})

// Luo uusi taski
app.post('/', (req, res) => {
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.json(result.ops[0])
        }
    })
});

// Päivitä taskia
app.put('/:id', (req, res) => {
    const taskID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate(
        { _id: db.getPrimaryKey(taskID) },
        { $set: { name: userInput.name, summary: userInput.summary, tag: userInput.tag } }, {
        returnOriginal: false
    }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
});

// Poista taski
app.delete('/:id', (req, res) => {
    const taskID = req.params.id;

    db.getDB().collection(collection).findOneAndDelete(
        { _id: db.getPrimaryKey(taskID) }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        })
});

// Yhdistä tietokantaan ja kuuntele .env tiedostossa määriteltyä porttia
db.connect((err) => {

    if (err) {
        console.log('Unable to connect');
        process.exit(1);
    } else {
        app.listen(process.env.PORT, () =>
            console.log(`running on port: ${process.env.PORT}`));
    }
});
