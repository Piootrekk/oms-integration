import { getIdoSellApiKey, getIdosellUrl } from "../env";
import { createGatewayInstance } from "./idosell-gateway";
import { fetchAllChunksOfOrders } from "./orders-fetchbulk";

const getAllOrders = async () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);

  const allIds: string[] = [];
  const pageSize = 100;
  await fetchAllChunksOfOrders(gatewayInstance, pageSize, (orders) =>
    allIds.push(
      ...orders.Results.map((result) => result.orderDetails.orderStatus)
    )
  );
  return allIds;
};

export { getAllOrders };
