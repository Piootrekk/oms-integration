import { getIdoSellApiKey, getIdosellUrl } from "../env";
import {
  createGatewayInstance,
  searchOrdersByDateRange,
} from "./idosell-gateway";
import { fetchAllChunksOfOrders } from "./orders-fetchbulk";
import { getDbConnection } from "@db/connection";
const getAllOrders = async () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);

  const resp = await searchOrdersByDateRange(
    gatewayInstance,
    "2025-08-20 7:00:00",
    "2025-08-20 18:00:00"
  );
  const allItems = resp.Results;
  return allItems;
};

export { getAllOrders };
