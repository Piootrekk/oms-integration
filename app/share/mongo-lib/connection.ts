import { Db, MongoClient } from "mongodb";

const getDbConnection = async (
  connectionString: string
): Promise<MongoClient> => {
  const client = new MongoClient(connectionString, {});
  await client.connect();
  console.log("Connection Db successful");
  return client;
};

const disconectDb = async (client: MongoClient) => {
  await client.close();
  console.log("Disconnection Db successful");
};

const dbSession = async (
  dbConString: string,
  actionDbCallback: (db: Db) => Promise<void> | void
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
export type { Db };
