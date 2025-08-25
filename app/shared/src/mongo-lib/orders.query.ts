import { Db, Filter, UpdateOneModel } from "mongodb";
import { OrderData, OrderDataModel } from "./orders.model";

const ORDERS_COLLECTION_NAME = "orders";

const clearAllOrdersDocs = async (db: Db) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  await orders.deleteMany({});
};

const logInsert = (count: number) => {
  console.log(`[DB] Added ${count} orders to DB`);
};
const logUpdate = (count: number) => {
  console.log(`[DB] Updated ${count} orders to DB`);
};

const insertManyOrders = async (db: Db, ordersData: OrderData[]) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const inserted = await orders.insertMany(ordersData);
  logInsert(inserted.insertedCount);
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
  statuses: OrderData["status"][],
) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const filter = {
    status: {
      $nin: statuses,
    },
  } satisfies Filter<OrderDataModel>;
  const DocsQuantity = await orders.countDocuments(filter);
  return DocsQuantity;
};

const getDistinctStatusesInOrders = (db: Db) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  return orders.distinct("status");
};

const getOrdersByIds = async (db: Db, orderId: string[]) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const filter = {
    orderId: {
      $in: orderId,
    },
  } satisfies Filter<OrderDataModel>;
  const ordersDocs = await orders.find(filter).toArray();
  return ordersDocs;
};

const getOrdersByPriceRange = async (
  db: Db,
  currency: string,
  minWorth?: number,
  maxPrice?: number,
) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const filter: Filter<OrderDataModel> = { currency };

  if (minWorth !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minWorth !== undefined) {
      filter.price.$gte = minWorth;
    }
    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }
  const ordersDocs = await orders.find(filter).toArray();
  return ordersDocs;
};

const updateOrdersWithNewState = async (
  db: Db,
  newOrdersProps: Pick<OrderData, "orderId" | "status">[],
) => {
  const orders = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const bulkOperations = newOrdersProps.map((orderUpdate) => ({
    updateOne: {
      filter: { orderId: orderUpdate.orderId },
      update: {
        $set: {
          status: orderUpdate.status,
        },
      },
      upsert: false,
    } satisfies UpdateOneModel<OrderDataModel>,
  }));
  const updated = await orders.bulkWrite(bulkOperations);
  logUpdate(updated.modifiedCount);
};

const getOrderById = async (db: Db, orderId: string) => {
  const collection = db.collection<OrderDataModel>(ORDERS_COLLECTION_NAME);
  const filter = {
    orderId: orderId,
  } satisfies Filter<OrderDataModel>;
  const currentOrder = await collection.findOne(filter);
  return currentOrder;
};

export {
  insertManyOrders,
  getCountDocsFromOrders,
  clearAllOrdersDocs,
  isEmptyOrders,
  getSelectedOrdersByStatuses,
  getOrdersByIds,
  updateOrdersWithNewState,
  getOrdersByPriceRange,
  getOrderById,
};
