import idosell, { Gateways } from "idosell";

const createGatewayInstance = (idosellApiKey: string, idosellUrl: string) => {
  const idosellInstance = idosell(idosellUrl, idosellApiKey);
  return idosellInstance;
};

const getSearchOrders = async (
  gateway: Gateways,
  serialNumber: number | number[]
) => {
  const ordersSearch = await gateway.getOrders
    .ordersSerialNumbers(serialNumber)
    .exec();
  return ordersSearch;
};

const postSearchOrders = async (gateway: Gateways) => {
  const osada = gateway.searchOrders;
};

const getReturn = (gateway: Gateways) => {
  const getReturnsRequest = gateway.getReturns
    .dates("2023-12-01", Date.now(), "date_add")
    .page(0, 10);
};

const searchOrders = (gateway: Gateways) => {
  const searchedOrders = gateway.searchOrders
    .dates(Date.now() - 86400000, Date.now(), "modified")
    .exec();
};

export { createGatewayInstance, getSearchOrders };
