import { getDbInstance } from "./../../config/db";
import { getOrderById, getOrdersByPriceRange } from "@db/orders.query";

const ordersRangeRepository = async (
  currency: string,
  minWorth?: number,
  maxWorth?: number
) => {
  const db = getDbInstance();
  const rangedOrders = await getOrdersByPriceRange(
    db,
    currency,
    minWorth,
    maxWorth
  );
  return rangedOrders;
};

const orderByIdRepository = async (orderId: string) => {
  const db = getDbInstance();
  const currentOrder = await getOrderById(db, orderId);
  return currentOrder;
};

export { ordersRangeRepository, orderByIdRepository };
