import { Request, Response } from "express";
import { ordersByWorthService, parseOrderRangeFilters } from "./order.service";
import { IdParamDics, WorthQueryParam } from "./order.types";

const getOrderByWorthRangeController = async (
  request: Request<unknown, unknown, unknown, WorthQueryParam>,
  response: Response
) => {
  try {
    const { minWorth, maxWorth, currency } = request.query;
    const convertedProps = parseOrderRangeFilters(minWorth, maxWorth, currency);
    const ordersInCSV = ordersByWorthService(
      convertedProps.currency,
      convertedProps.minWorth,
      convertedProps.maxWorth
    );
  } catch (err) {}
};

const getOrderByIdController = (
  request: Request<IdParamDics>,
  response: Response
) => {
  try {
    const { orderId } = request.params;
    const parsedId = parseOrderRangeFilters(orderId);
  } catch (err) {}
};

export { getOrderByWorthRangeController, getOrderByIdController };
