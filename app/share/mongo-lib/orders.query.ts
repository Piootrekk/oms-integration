import { Db } from "mongodb";
import { OrderData, OrderDataModel } from "./orders.model";

const insertBulkOrders = (
  db: Db,
  collectionName: string,
  orders: OrderData[]
) => {
  const collection = db.collection<OrderDataModel>(collectionName);
  collection.insertMany(orders);
};

export { insertBulkOrders };
