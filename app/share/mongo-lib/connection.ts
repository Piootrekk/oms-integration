import { Db, MongoClient } from "mongodb";

const getDbConnection = async (
  connectionString: string,
  dbName: string
): Promise<Db> => {
  const client = new MongoClient(connectionString, {
    retryWrites: true,
    retryReads: true,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  const db = client.db(dbName);
  return db;
};

export { getDbConnection };
