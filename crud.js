const { MongoClient } = require('mongodb');
const Task = require('./models/task');

async function createTask(client, newTask) {
    const result = await client.db("task").collection("data").insertOne(newTask);
    console.log(`New task created with this id: ${result.insertedId}`);
}

async function createMultipleTasks(client, newTasks) {
    const result = await client.db("task").collection("data").insertMany(newTasks);

    console.log(`${result.insertCount} new tasks created with the following id(s):`);
    console.log(result.insertedIds);
}

async function findOneTaskByName(client, nameOfTask) {
    result = await client.db("task").collection("data").findOne({name: nameOfTask});

    if (result) {
        console.log(`Found task in collection with the name '${nameOfTask}':`);
        console.log(result);
    } else {
        console.log(`No task found with the name '${nameOfTask}'`);
    }
}

async function findAll(client) {
    const cursor = client.db("task").collection("data").find({})

    const results = await cursor.toArray();

    if (results.lengt > 0) {
        console.log(`Found ${results.matchedCount} tasks`)
        console.log(results)
    } else {
        console.log('No tasks found')
    }
}

async function findMultipleByTag(client, nameOfTag) {
    const cursor = client.db("task").collection("data").find({
        tag: nameOfTag
    })

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found task(s) with tag '${nameOfTag}'`)
        results.forEach((result, i) => {
            
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   summary: ${result.summary}`)
            console.log(`   _id: ${result._id}`);
        })
    } else {
        console.log(`No tasks with tag '${nameOfTag}'`)
    }
}

async function updateTaskByName(client, nameOfTask, updatedTask) {
    result = await client.db("task").collection("data").updateOne({name: nameOfTask}, {$set: updatedTask});

    console.log(`${result.matchedCount} document matched the query criteria`);
    console.log(`${result.modifiedCount} document was updated`);
}

async function upsertTaskByName(client, nameOfTask, updatedTask) {
    result = await client.db("task").collection("data").updateOne({name: nameOfTask}, {$set: updatedTask}, {upsert: true});

    console.log(`${result.matchedCount} docuemnt matched query criteria`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document was updated`);
    }
}

async function deleteTaskByName(client, nameOfTask) {
    result = await client.db("task").collection("data").deleteOne({name: nameOfTask});

    console.log(`${result.deletedCount} document was deleted`);
}

module.exports = { createTask, updateTaskByName, deleteTaskByName, findMultipleByTag, findAll }