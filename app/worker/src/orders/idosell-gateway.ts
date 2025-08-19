import idosell, { Gateways } from "idosell";

const createGatewayInstance = (idosellApiKey: string, idosellUrl: string) => {
  const idosellInstance = idosell(idosellUrl, idosellApiKey);
  return idosellInstance;
};

const getOrders = async (
  gateway: Gateways,
  serialNumber: number | number[]
) => {
  const ordersSearch = await gateway.getOrders
    .ordersSerialNumbers(serialNumber)
    .exec();
  return ordersSearch;
};

const searchOrders = async (gateway: Gateways) => {
  const searchedOrders = await gateway.searchOrders
    .setParams({
      params: { orderPrepaidStatus: "orderPrepaidStatus" },
    })
    .exec();
  return searchedOrders;
};

export { createGatewayInstance, getOrders, searchOrders };
