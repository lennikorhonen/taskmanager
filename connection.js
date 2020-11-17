const { MongoClient } = require('mongodb');

const dotenv = require('dotenv/config');


async function connect() {
    const uri = process.env.DATABASE_URI;

    const client = new MongoClient(uri);
    try {
        await client.connect(); //yhdistetään tietokanta clusteriin


        await listDatabases(client); //listataan tietokannat
    } catch {
        console.error()
    }
}

connect().catch(console.error);


async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}; 

module.exports = { connect }

/*
    await createTask(
        client,
        {
            name: 'Task manager',
            summary: 'Ohjelmistoteknologiat seminaarityö',
            tag: 'School'
        }
    );
    await createMultipleTasks(client, [
    {
        name: 'Backend',
        summary: 'Ohjelmistoprojekti 2 backend koodausta',
        tag: 'School'
    },
    {
        name: 'Firebase shopping list',
        summary: 'Mobiiliohjelmointi tehtävä',
        tag: 'School'
    },
    {
        name: 'Käy kaupassa',
        summary: '-',
        tag: 'Free-time'
    }
]
)*/