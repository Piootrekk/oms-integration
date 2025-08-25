import { dbSession } from "@db/connection";
import { getGatewayInstance } from "../gateway-instance";
import {
  fetchAllOrders,
  getSearchRequestByDate,
  type SearchOrdersResponse,
} from "../idosell-gateway";
import { getDBConnectionString } from "../../env";
import { transformBulkOrdersResults } from "../orders-transform";
import { insertManyOrders } from "@db/orders.query";

const manageNewOrders = async (
  chunkOrders: SearchOrdersResponse,
  dbString: string,
) => {
  await dbSession(dbString, async (db) => {
    const orders = transformBulkOrdersResults(chunkOrders.Results);
    await insertManyOrders(db, orders);
  });
};

const logNewItemFound = (amount: number) => {
  console.log(`[Insert] New orders ${amount} found.`);
};

const logNotingFound = () => {
  console.log("[Insert] Nothing new.");
};

const getNewOrders = async (dateFrom: Date, dateTo: Date) => {
  const gateway = getGatewayInstance();
  const dbString = getDBConnectionString();
  const newOrdersRequest = getSearchRequestByDate(gateway, dateFrom, dateTo);
  try {
    await fetchAllOrders(newOrdersRequest, async (chunk) => {
      logNewItemFound(chunk.Results.length);
      await manageNewOrders(chunk, dbString);
    });
  } catch (_) {
    logNotingFound();
  }
};

export { getNewOrders };
