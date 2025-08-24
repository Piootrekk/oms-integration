import { ordersRangeRepository } from "./order.repository";

const orderByIdService = (id: string) => {};
const ordersByWorthService = async (
  currency: string,
  minWorth?: number,
  maxWorth?: number
) => {
  const orders = await ordersRangeRepository(currency, minWorth, maxWorth);
  // here csv transformation ig
};

const parseOrderRangeFilters = (
  minWorth?: string,
  maxWorth?: string,
  currency?: string
) => {
  return {
    minWorth: minWorth === undefined ? undefined : parseFloat(minWorth),
    maxWorth: maxWorth === undefined ? undefined : parseFloat(maxWorth),
    currency: currency ? currency : "PLN",
  };
};

const parsedOrderIdFilters = (orderId?: string) => {
  if (orderId === undefined) throw Error("OrderId not found");
  return orderId;
};

export { parseOrderRangeFilters, orderByIdService, ordersByWorthService };
