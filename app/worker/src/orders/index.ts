import { Db, dbSession } from "@db/connection";
import { getDBConnectionString, getIdoSellApiKey, getIdosellUrl } from "../env";
import { createGatewayInstance } from "./idosell-gateway";
import { fetchAllChunksOfOrders } from "./orders-fetchbulk";
import {
  clearAllOrdersDocs,
  insertBulkOrders,
  isEmptyOrders,
} from "@db/orders.query";
import { transformOrderResults } from "./orders-transform";
import { handleErrorToMessage } from "src/utils/error-handler";
import { Gateways } from "idosell";

const getGatewayInstance = () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);
  return gatewayInstance;
};

// const resp = await searchOrdersByDateRange(
//     gatewayInstance,
//     "2025-08-19 0:00:01",
//     "2025-08-20 00:00:00"
//   );
//   // const allItems = resp.resultsNumberAll;
//   const ids = resp.Results.map((res) => res.orderSerialNumber);
//   return ids;

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

const insertAllOrders = async () => {
  const pageSize = 100;
  const gatewayInstance = getGatewayInstance();
  const conDbString = getDBConnectionString();
  await dbSession(conDbString, async (db) => {
    try {
      const isEmpty = await isEmptyOrders(db);
      if (!isEmpty) {
        console.log("DB IS INITIALIZED ALREADY");
        return;
      }
      console.log("FETCHING ALL ORDERS");
      await manageAllFetchesToOrdersInsertion(gatewayInstance, db, pageSize);
    } catch (err) {
      console.error(
        `ERROR IN INSERTING ALL ORDERS ${handleErrorToMessage(err)}`
      );
      await clearAllOrdersDocs(db);
    }
  });
};

export { insertAllOrders };
