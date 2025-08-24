import { getDbInstance } from "./../../config/db";
import { getOrdersByPriceRange } from "@db/orders.query";

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

export { ordersRangeRepository };
