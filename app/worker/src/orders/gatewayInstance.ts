import { getIdoSellApiKey, getIdosellUrl } from "src/env";
import { createGatewayInstance } from "./idosell-gateway";

const getGatewayInstance = () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);
  return gatewayInstance;
};

export { getGatewayInstance };

// const resp = await searchOrdersByDateRange(
//     gatewayInstance,
//     "2025-08-19 0:00:01",
//     "2025-08-20 00:00:00"
//   );
//   // const allItems = resp.resultsNumberAll;
//   const ids = resp.Results.map((res) => res.orderSerialNumber);
//   return ids;
