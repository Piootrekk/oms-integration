import idosell, { Gateways } from "idosell";
import { DateLike } from "idosell/dist/app";

const RESULTS_NUMBER_ALL_LIMIT = 100;

const createGatewayInstance = (idosellApiKey: string, idosellUrl: string) => {
  const idosellInstance = idosell(idosellUrl, idosellApiKey);
  return idosellInstance;
};

const getOrders = async (
  gateway: Gateways,
  serialNumber: number | number[]
) => {
  const ordersQuery = await gateway.getOrders
    .ordersSerialNumbers(serialNumber)
    .exec();
  return ordersQuery;
};

const searchOrdersByDateRange = async (
  gateway: Gateways,
  dateConfirmedFrom: DateLike,
  dateConfirmedTo: DateLike
) => {
  const searchedOrders = await gateway.searchOrders
    .dates(dateConfirmedFrom, dateConfirmedTo, "add")
    .exec();
  if (searchedOrders.resultsNumberAll > RESULTS_NUMBER_ALL_LIMIT)
    throw new Error(
      `Cannot handle more then ${RESULTS_NUMBER_ALL_LIMIT} per tick, reduce time range`
    );
  return searchedOrders;
};

const searchAllAmountsOrders = async (gateway: Gateways) => {
  const querySearch = await gateway.searchOrders
    .resultsPage(1)
    .resultsLimit(1)
    .exec();
  const ordersQuantity = querySearch.resultsNumberAll;
  return ordersQuantity;
};

export {
  createGatewayInstance,
  getOrders,
  searchOrdersByDateRange,
  searchAllAmountsOrders,
  RESULTS_NUMBER_ALL_LIMIT,
};
