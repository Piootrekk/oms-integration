import idosell, { Gateways } from "idosell";
import { DateLike } from "idosell/dist/app";

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

// const searchOrders = async (gateway: Gateways) => {
//   const searchedOrders = await gateway.searchOrders
//     .setParams({
//       params: { orderPrepaidStatus: "orderPrepaidStatus" },
//     })
//     .exec();
//   return searchedOrders;
// };

// const searchOrdersTest = async (
//   gateway: Gateways,
//   dateConfirmedFrom: DateLike,
//   dateConfirmedTo: DateLike
// ) => {
//   const searchParams = {
//     ordersRange: { dateConfirmedFrom, dateConfirmedTo },
//     resultsPage: 0,
//     resultsLimit: 100,
//   };
//   const searchedOrders = await gateway.searchOrders
//     .setParams({
//       params: searchParams,
//     })
//     .exec();
//   return searchedOrders;
// };

const searchOrdersByDateRange = async (
  gateway: Gateways,
  dateConfirmedFrom: DateLike,
  dateConfirmedTo: DateLike
) => {
  const searchedOrders = await gateway.searchOrders
    .dates(dateConfirmedFrom, dateConfirmedTo, "add")
    .exec();

  return searchedOrders;
};

export { createGatewayInstance, getOrders, searchOrdersByDateRange };
