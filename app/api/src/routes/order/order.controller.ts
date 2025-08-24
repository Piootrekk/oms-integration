import { Request, Response } from "express";
import {
  orderByIdService,
  ordersByWorthService,
  parseOrderRangeFilters,
  parsedOrderIdFilters,
} from "./order.service";
import { IdParamDict, WorthQueryParam } from "./order.types";

const getOrderByWorthRangeController = async (
  request: Request<unknown, unknown, unknown, WorthQueryParam>,
  response: Response
) => {
  try {
    const { minWorth, maxWorth, currency } = request.query;
    const convertedProps = parseOrderRangeFilters(minWorth, maxWorth, currency);
    const ordersInCSV = await ordersByWorthService(
      convertedProps.currency,
      convertedProps.minWorth,
      convertedProps.maxWorth
    );
  } catch (err) {}
};

const getOrderByIdController = async (
  request: Request<IdParamDict>,
  response: Response
) => {
  try {
    const { orderId } = request.params;
    const parsedId = parsedOrderIdFilters(orderId);
    const currentOrderInCSV = await orderByIdService(parsedId);
  } catch (err) {}
};

export { getOrderByWorthRangeController, getOrderByIdController };
