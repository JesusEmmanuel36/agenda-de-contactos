 
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;  
let client;
let clientPromise;

if (!uri) {
  throw new Error("no existe MONGO_URI");
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export { clientPromise };
