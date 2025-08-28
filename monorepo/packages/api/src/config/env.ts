import { configDotenv } from "dotenv";
import path from "path";

const rootPath = process.cwd();
const monorepoPath = path.resolve(rootPath, "../..");
configDotenv({
  path: [path.join(monorepoPath, ".env"), ".env"],
  override: false,
});

const getDBConnectionString = () => {
  const { DB_CONNECTION_STRING } = process.env;
  if (!DB_CONNECTION_STRING)
    throw new Error("DB_CONNECTION_STRING not found in .env");
  return DB_CONNECTION_STRING;
};

const getApiKey = () => {
  const { API_KEY } = process.env;
  if (!API_KEY) throw new Error("API_KEY not found in .env");
  return API_KEY;
};

export { getDBConnectionString, getApiKey };
