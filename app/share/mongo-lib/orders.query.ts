import { Db } from "mongodb";
import { OrderData, OrderDataModel } from "./orders.model";

const ORDERS_COLLECTION_NAME = "orders";

const clearAllOrdersDocs = async (db: Db) => {
  const collection = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  await collection.deleteMany({});
};

const insertBulkOrders = async (db: Db, orders: OrderData[]) => {
  const collection = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  await collection.insertMany(orders);
  console.log(`Added ${orders.length} to DB`);
};

const getCountDocsFromOrders = async (db: Db) => {
  const collection = db.collection(ORDERS_COLLECTION_NAME);
  return await collection.countDocuments();
};

const isEmptyOrders = async (db: Db) => {
  const collection = db.collection(ORDERS_COLLECTION_NAME);
  const count = await collection.countDocuments();
  if (count > 0) return false;
  return true;
};

export {
  insertBulkOrders,
  getCountDocsFromOrders,
  clearAllOrdersDocs,
  isEmptyOrders,
};
