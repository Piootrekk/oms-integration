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
};

const getAmoutDocsFromCollection = async (db: Db) => {
  const collection = db.collection(ORDERS_COLLECTION_NAME);
  return await collection.countDocuments();
};

export { insertBulkOrders, getAmoutDocsFromCollection, clearAllOrdersDocs };
