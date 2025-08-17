import { config } from "dotenv";

config();

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

export { getIdoSellApiKey, getIdosellUrl };
