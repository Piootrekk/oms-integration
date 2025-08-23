import idosell, { Gateways, SearchOrdersRequest } from "idosell";
import { DateLike } from "idosell/dist/app";
import { SearchOrdersResponse } from "idosell/dist/responses";

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

const getSearchRequestByDate = (
  gateway: Gateways,
  dateFrom: DateLike,
  dateTo: DateLike
) => {
  const requestSearch = gateway.searchOrders
    .dates(dateFrom, dateTo, "add")
    .resultsLimit(100);
  return requestSearch;
};

const getSearchOrdersRequest = (gateway: Gateways) => {
  const requestSearch = gateway.searchOrders.resultsLimit(100);
  return requestSearch;
};

const getSerchRequestSelectedStatuses = (
  gateway: Gateways,
  statuses: string[]
) => {
  const querySearch = gateway.searchOrders
    .ordersStatuses(statuses)
    .resultsLimit(100);
  return querySearch;
};

const searchAllAmountsOrders = async (gateway: Gateways) => {
  const querySearch = await gateway.searchOrders
    .resultsPage(0)
    .resultsLimit(1)
    .exec();
  const ordersQuantity = querySearch.resultsNumberAll;
  return ordersQuantity;
};

const fetchAllOrders = async (
  searchRequest: SearchOrdersRequest,
  callback: (chunk: SearchOrdersResponse) => Promise<void>
) => {
  const fistChunk = await searchRequest.exec();
  await callback(fistChunk);
  while (searchRequest.hasNext()) {
    const anotherFetch = await searchRequest.exec();
    await callback(anotherFetch);
  }
};

export {
  RESULTS_NUMBER_ALL_LIMIT,
  createGatewayInstance,
  getOrders,
  getSearchOrdersRequest,
  getSearchRequestByDate,
  searchAllAmountsOrders,
  getSerchRequestSelectedStatuses,
  fetchAllOrders,
};

export type { Gateways, SearchOrdersResponse };
