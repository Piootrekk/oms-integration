import { Db, MongoClient } from "mongodb";

const getDbConnection = async (
  connectionString: string,
  dbName: string
): Promise<Db> => {
  const client = new MongoClient(connectionString);
  await client.connect();
  const db = client.db(dbName);
  return db;
};

export { getDbConnection };
