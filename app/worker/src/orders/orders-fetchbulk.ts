import { SearchOrdersResponse } from "idosell/dist/responses";
import { getOrders } from "./idosell-gateway";
import { Gateways } from "idosell";
import { handleErrorToMessage } from "src/utils/error-handler";

const computeStartIndex = (pageIndex: number, pageSize: number) =>
  pageIndex * pageSize + 1;

const generateChunkSerialNumbers = (startIndex: number, pageSize: number) => {
  return Array.from({ length: pageSize }, (_, i) => startIndex + i);
};

const isLastPage = (resLenght: number, pageSize: number) => {
  return resLenght === 0 || resLenght < pageSize;
};

const logChunk = (index: number, pageSize: number, responseSize: number) => {
  console.log(`Page ${index}-${pageSize}: requested serials`);
  console.log(`Fetched ${responseSize} orders success`);
};

const logError = (index: number, pageSize: number, errMsg: string) => {
  console.error(`Error in bulk fetch at: ${index}:${pageSize}, ${errMsg}`);
};

const calculateCurrentFetch = async (
  gateway: Gateways,
  currentPage: number,
  pageSize: number
) => {
  const currentStartIndex = computeStartIndex(currentPage, pageSize);
  try {
    const serialChunk = generateChunkSerialNumbers(currentStartIndex, pageSize);
    const orders = await getOrders(gateway, serialChunk);
    logChunk(currentStartIndex, pageSize, orders.Results.length);
    return orders;
  } catch (err) {
    const transformatedErr = handleErrorToMessage(err);
    logError(currentStartIndex, pageSize, transformatedErr);
  }
};

const fetchAllChunksOfOrders = async (
  gateway: Gateways,
  pageSize: number,
  callBackData: (orders: SearchOrdersResponse) => void
) => {
  let currentPage = 0;
  let hasMoreResults = true;
  while (hasMoreResults) {
    const orders = await calculateCurrentFetch(gateway, currentPage, pageSize);
    if (!orders) return;
    currentPage++;
    if (isLastPage(orders.Results.length, pageSize)) hasMoreResults = false;
    callBackData(orders);
  }
};

export { fetchAllChunksOfOrders };
