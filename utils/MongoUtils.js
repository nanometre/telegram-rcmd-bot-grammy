import { MongoClient } from "mongodb";

export async function connect(url, dbname) {
    const client = new MongoClient(url)
    await client.connect()

    const database = client.db(dbname)
    console.log(`Successfully connected to ${dbname} database`)
    return database
}