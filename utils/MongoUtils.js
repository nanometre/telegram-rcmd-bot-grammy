/* Connect to MongoDB client */
import { MongoClient } from "mongodb";

export async function connect(url, dbname) {
    const client = new MongoClient(url)
    try {
        await client.connect()
        const database = client.db(dbname)
        console.log(`Successfully connected to ${dbname} database`)
        return database
    } catch {
        await client.close()
    }
}