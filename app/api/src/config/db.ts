import { disconectDb, getDbConnection } from "@db/connection";
import type { MongoClient, Db } from "@db/connection";
import { getDBConnectionString } from "./env";

const conString = getDBConnectionString();

let db: Db;
let client: MongoClient;

const connectDb = async () => {
  client = await getDbConnection(conString);
  db = client.db();
};

const closeDb = async () => {
  if (client) disconectDb(client);
  else throw new Error("connection not exist, cannot disconnect");
};

const getDbInstance = () => {
  if (db) return db;
  else throw new Error("Db not exist, connect first");
};

export { getDbInstance, connectDb, closeDb };
