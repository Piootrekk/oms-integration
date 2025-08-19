import { SearchOrdersResponse } from "idosell/dist/responses";
import { getOrders } from "./idosell-gateway";
import { Gateways } from "idosell";

const computeStartIndex = (pageIndex: number, pageSize: number) =>
  pageIndex * pageSize + 1;

const generateChunkSerialNumbers = (startIndex: number, pageSize: number) => {
  return Array.from({ length: pageSize }, (_, i) => startIndex + i);
};

const isLastPage = (resLenght: number, pageSize: number) => {
  return resLenght === 0 || resLenght < pageSize;
};

const logChunk = (pageIndex: number, size: number) => {
  console.log(`Page ${pageIndex}: requested serials`);
  console.log(`Page ${pageIndex}: fetched ${size} orders`);
};

const fetchAllChunksOfOrders = async (
  gateway: Gateways,
  pageSize: number,
  callBackData: (orders: SearchOrdersResponse) => void
) => {
  let currentPage = 0;
  let hasMoreResults = true;
  while (hasMoreResults) {
    const currentStartIndex = computeStartIndex(currentPage, pageSize);
    const serialChunk = generateChunkSerialNumbers(currentStartIndex, pageSize);
    const orders = await getOrders(gateway, serialChunk);
    callBackData(orders);
    logChunk(currentPage, orders.Results.length);
    currentPage++;
    if (isLastPage(orders.Results.length, pageSize)) hasMoreResults = false;
  }
};

export { fetchAllChunksOfOrders };
