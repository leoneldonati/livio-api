import { MongoClient } from "mongodb";
import { CLUSTER_NAME, DB_NAME, DB_PASS, USER_NAME } from "../variables.js";

const MONGO_URI = `mongodb+srv://${USER_NAME}:${DB_PASS}@cluster0.fo3dmlm.mongodb.net/?w=majority`;
const client = new MongoClient(MONGO_URI, {
  appName: CLUSTER_NAME,
  retryWrites: true,
});

async function startDb() {
  try {
    const connection = await client.connect();

    const db = connection.db(DB_NAME);

    console.log(`Connected on ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error(error);
  }
}

const db = await startDb();

// COLLECTIONS

export const usersCollection = db.collection("users");
