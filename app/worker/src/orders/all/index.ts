import { dbSession, type Db } from "@shared/mongo-lib/connection";
import {
  searchAllAmountsOrders,
  type Gateways,
  fetchAllOrders,
  getSearchOrdersRequest,
} from "./../idosell-gateway";
import {
  insertManyOrders,
  isEmptyOrders,
  clearAllOrdersDocs,
  getCountDocsFromOrders,
} from "@shared/mongo-lib/orders.query";
import { getDBConnectionString } from "./../../env";
import { handleErrorToMessage } from "./../../utils/error-handler";
import { transformBulkOrdersResults } from "../orders-transform";
import { getGatewayInstance } from "../gateway-instance";

const manageAllFetchesToOrdersInsertion = async (db: Db, gateway: Gateways) => {
  const searchOrdersRequest = getSearchOrdersRequest(gateway);
  await fetchAllOrders(searchOrdersRequest, async (chunkOrders) => {
    const orders = transformBulkOrdersResults(chunkOrders.Results);
    await insertManyOrders(db, orders);
  });
};

const missDataWarning = async (gateway: Gateways, db: Db) => {
  const docsCount = await getCountDocsFromOrders(db);
  const ordersGatewayCount = await searchAllAmountsOrders(gateway);
  if (ordersGatewayCount > docsCount)
    console.warn(
      "[Insert all] Potential mismatch detected: some orders may",
      "exist both in the database and in the gateway, but are not fully synchronized.",
      `${docsCount} DB : ${ordersGatewayCount} gateway.`,
    );
};

const logError = (err: unknown) => {
  console.error(
    `[Insert all] ERROR IN INSERTING ALL ORDERS ${handleErrorToMessage(err)}`,
  );
};

const isEmptyInDb = async (db: Db, gateway: Gateways) => {
  const isEmpty = await isEmptyOrders(db);
  if (!isEmpty) {
    console.log("[Insert all] DB IS INITIALIZED ALREADY");
    await missDataWarning(gateway, db);
    return false;
  }
  return true;
};

const insertAllOrders = async () => {
  const gatewayInstance = getGatewayInstance();
  const conDbString = getDBConnectionString();
  await dbSession(conDbString, async (db: Db) => {
    try {
      const isEmpty = await isEmptyInDb(db, gatewayInstance);
      if (!isEmpty) return;
      await manageAllFetchesToOrdersInsertion(db, gatewayInstance);
    } catch (err) {
      await clearAllOrdersDocs(db);
      logError(err);
    }
  });
};

export { insertAllOrders };
