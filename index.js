const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv/config');

const { createTask, findMultipleByTag, updateTaskByName, deleteTaskByName, findAll } = require('./crud');
const { connect } = require('./connection');
const Task = require('./models/task');

const app = express();

app.use(cors());

app.get('/', (reg, res) => {
    res.send(findAll);
});

app.post('/', (reg, res) => {
    res.send('Recieved a POST HTTP method')
})

app.put('/:name', (reg, res) => {
    res.send(`Recieved a PUT HTTP method on task/${req.params.name}`)
})

app.delete('/:name', (reg, res) => {
    res.send(`Recieved a DELETE HTTP method on task/${req.params.name}`)
})

connect().then(async () => {
    app.listen(process.env.PORT, () => console.log(`running on port: ${process.env.PORT}`));
});

