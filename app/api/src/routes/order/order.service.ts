import { createCSV } from "src/utils/csv-converter";
import { orderByIdRepository, ordersRangeRepository } from "./order.repository";
import { transformOrderDto, transformOrdersDto } from "./order.dto";

const orderByIdService = async (orderId: string) => {
  const currnetOrder = await orderByIdRepository(orderId);
  if (!currnetOrder) throw new Error(`Order with ID ${orderId} was not found.`);
  const orderDto = transformOrderDto(currnetOrder);
  const orderCSV = createCSV(orderDto);
  return orderCSV;
};

const ordersByWorthService = async (
  currency: string,
  minWorth?: number,
  maxWorth?: number
) => {
  const orders = await ordersRangeRepository(currency, minWorth, maxWorth);
  const orderDto = transformOrdersDto(orders);
  const csvOrders = createCSV(orderDto);
  return csvOrders;
};

const parseToNumber = (valueToParse: string) => {
  const parsedValue = parseFloat(valueToParse);
  if (isNaN(parsedValue)) throw new Error(`Invalid number ${parsedValue}`);
  return parsedValue;
};

const parseOrderRangeFilters = (
  minWorth?: string,
  maxWorth?: string,
  currency?: string
) => {
  const parsed = {
    minWorth: minWorth === undefined ? undefined : parseToNumber(minWorth),
    maxWorth: maxWorth === undefined ? undefined : parseToNumber(maxWorth),
    currency: currency ? currency : "PLN",
  };
  return parsed;
};

const parsedOrderIdFilters = (orderId?: string) => {
  if (orderId === undefined) throw Error("OrderId not found");
  return orderId;
};

export {
  parseOrderRangeFilters,
  orderByIdService,
  ordersByWorthService,
  parsedOrderIdFilters,
};
