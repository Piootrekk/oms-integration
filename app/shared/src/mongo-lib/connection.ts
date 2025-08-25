import { Db, MongoClient } from "mongodb";

const getDbConnection = async (
  connectionString: string,
): Promise<MongoClient> => {
  const client = new MongoClient(connectionString, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 50000,
  });
  await client.connect();
  return client;
};

const disconectDb = async (client: MongoClient) => {
  await client.close();
};

const dbSession = async (
  dbConString: string,
  actionDbCallback: (db: Db) => Promise<void> | void,
) => {
  const dbClient = await getDbConnection(dbConString);
  try {
    const db = dbClient.db();
    await actionDbCallback(db);
  } finally {
    await disconectDb(dbClient);
  }
};

export { getDbConnection, disconectDb, dbSession };
export type { Db, MongoClient };
