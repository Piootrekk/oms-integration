import { configDotenv } from "dotenv";

configDotenv();

const getIdosellUrl = () => {
  const { IDOSELL_URL } = process.env;
  if (!IDOSELL_URL) throw new Error("IDOSELL_URL not found in .env");
  return IDOSELL_URL;
};

const getIdoSellApiKey = () => {
  const { IDOSELL_API_KEY } = process.env;
  if (!IDOSELL_API_KEY) throw new Error("IDOSELL_API_KEY not found in .env");
  return IDOSELL_API_KEY;
};

const getDBConnectionString = () => {
  const { DB_CONNECTION_STRING } = process.env;
  if (!DB_CONNECTION_STRING)
    throw new Error("DB_CONNECTION_STRING not found in .env");
  return DB_CONNECTION_STRING;
};

const getCronJobString = () => {
  const { WORKER_CRONJOB_STRING } = process.env;
  if (!WORKER_CRONJOB_STRING)
    throw new Error("WORKER_CRONJOB_STRING not found in .env");
  return WORKER_CRONJOB_STRING;
};

export {
  getIdoSellApiKey,
  getIdosellUrl,
  getDBConnectionString,
  getCronJobString,
};
