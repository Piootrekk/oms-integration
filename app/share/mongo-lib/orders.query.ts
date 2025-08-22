import { Db } from "mongodb";
import { OrderData, OrderDataModel } from "./orders.model";

const ORDERS_COLLECTION_NAME = "orders";

const clearAllOrdersDocs = async (db: Db) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  await orders.deleteMany({});
};

const insertBulkOrders = async (db: Db, ordersData: OrderData[]) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  await orders.insertMany(ordersData);
  console.log(`[DB] Added ${ordersData.length} to DB`);
};

const getCountDocsFromOrders = async (db: Db) => {
  const orders = db.collection(ORDERS_COLLECTION_NAME);
  return await orders.countDocuments();
};

const isEmptyOrders = async (db: Db) => {
  const orders = db.collection(ORDERS_COLLECTION_NAME);
  const count = await orders.countDocuments();
  if (count > 0) return false;
  return true;
};

const getSelectedOrdersByStatuses = async (
  db: Db,
  statuses: OrderData["status"][]
) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const filter = {
    status: {
      $nin: statuses,
    },
  };
  const DocsQuantity = await orders.countDocuments(filter);
  return DocsQuantity;
};

const getDistinctStatusesInOrders = (db: Db) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  return orders.distinct("status");
};

export {
  insertBulkOrders,
  getCountDocsFromOrders,
  clearAllOrdersDocs,
  isEmptyOrders,
  getSelectedOrdersByStatuses,
  getDistinctStatusesInOrders,
};
