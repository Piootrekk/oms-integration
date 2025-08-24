import { config } from "dotenv";

config();

const getDBConnectionString = () => {
  const { DB_CONNECTION_STRING } = process.env;
  if (!DB_CONNECTION_STRING)
    throw new Error("DB_CONNECTION_STRING not found in .env");
  return DB_CONNECTION_STRING;
};

export { getDBConnectionString };
