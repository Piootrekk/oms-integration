import { dbSession, type Db } from "@db/connection";
import { searchAllAmountsOrders, type Gateways } from "./../idosell-gateway";
import {
  insertBulkOrders,
  isEmptyOrders,
  clearAllOrdersDocs,
  getCountDocsFromOrders,
  getSelectedOrdersByStatuses,
  getDistinctStatusesInOrders,
} from "@db/orders.query";
import { getDBConnectionString } from "src/env";
import { handleErrorToMessage } from "src/utils/error-handler";
import { fetchAllChunksOfOrders } from "./orders-fetchbulk";
import { transformOrderResults } from "./orders-transform";
import { getGatewayInstance } from "../gatewayInstance";

const selectedStatuses = ["missing", "false", "finished", "canceled"];

const manageAllFetchesToOrdersInsertion = async (
  gatewayInstance: Gateways,
  db: Db,
  pageSize: number
) => {
  await fetchAllChunksOfOrders(gatewayInstance, pageSize, async (orders) => {
    const transfomedOrders = orders.Results.map((result) =>
      transformOrderResults(result)
    );
    await insertBulkOrders(db, transfomedOrders);
  });
};

const missDataWarning = async (gateway: Gateways, db: Db) => {
  const docsCount = await getCountDocsFromOrders(db);
  const ordersGatewayCount = await searchAllAmountsOrders(gateway);
  if (ordersGatewayCount > docsCount)
    console.warn(
      "[Insert all] Potential mismatch detected: some orders may",
      "exist both in the database and in the gateway, but are not fully synchronized.",
      `${docsCount} DB : ${ordersGatewayCount} gateway.`
    );
};

const insertAllOrders = async () => {
  const pageSize = 100;
  const gatewayInstance = getGatewayInstance();
  const conDbString = getDBConnectionString();
  await dbSession(conDbString, async (db) => {
    try {
      const isEmpty = await isEmptyOrders(db);
      if (!isEmpty) {
        await missDataWarning(gatewayInstance, db);
        console.log("[Insert all] DB IS INITIALIZED ALREADY");
        const statuses = await getDistinctStatusesInOrders(db);
        console.log(statuses);
        const count = await getSelectedOrdersByStatuses(db, selectedStatuses);
        console.log(count);
        return;
      }
      console.log("[Insert all] FETCHING ALL ORDERS");
      await manageAllFetchesToOrdersInsertion(gatewayInstance, db, pageSize);
    } catch (err) {
      console.error(
        `[Insert all] ERROR IN INSERTING ALL ORDERS ${handleErrorToMessage(
          err
        )}`
      );
      await clearAllOrdersDocs(db);
    }
  });
};

export { insertAllOrders };
