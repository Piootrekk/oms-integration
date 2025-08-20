import { getIdoSellApiKey, getIdosellUrl } from "../env";
import { createGatewayInstance } from "./idosell-gateway";
import { fetchAllChunksOfOrders } from "./orders-fetchbulk";
import { getDbConnection } from "@db/connection";
const getAllOrders = async () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);

  const allIds: number[] = [];
  const pageSize = 100;
  await fetchAllChunksOfOrders(gatewayInstance, pageSize, (orders) =>
    allIds.push(...orders.Results.map((result) => result.orderSerialNumber))
  );
  console.log(getDbConnection);
  return allIds;
};

export { getAllOrders };
