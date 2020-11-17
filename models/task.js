const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: false,
            required: true
        },
        summary: {
            type: String,
            unique: false,
            required: false
        },
        tag: {
            type: String,
            unique: false,
            required: false
        }
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task }