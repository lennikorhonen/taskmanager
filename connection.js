const { MongoClient } = require('mongodb');

const pswd = 'k0uluty0';

async function main() {
    const uri = `mongodb+srv://dbAdmin:${pswd}@cluster0.2ojpx.mongodb.net/<dbname>?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        await client.connect(); //yhdistetään tietokanta clusteriin

        await createTask(
            client,
            {
                name: 'School work',
                summary: 'Ohjelmistoteknologiat seminaarityö'
            }
        )

        await listDatabases(client); //listataan tietokannat
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createTask(client, newTask) {
    const result = await client.db("sample_weatherdata").collection("data").insertOne(newTask);
    console.log(result);
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};