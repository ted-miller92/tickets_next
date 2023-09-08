import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGODB_CONNECT_STRING as string;
const options: MongoClientOptions = {};

let client;
let clientPromise: any;

if (!process.env.MONGODB_CONNECT_STRING) {
    throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    // global variable for hot module reloads in dev mode
    let globalMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    }

    if (!globalMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
}

export default clientPromise;