import { Request, Response } from "express";
import {
  orderByIdService,
  ordersByWorthService,
  parseOrderRangeFilters,
  parsedOrderIdFilters,
} from "./order.service";
import { IdParamDict, WorthQueryParam } from "./order.types";
import { handeError } from "./../../utils/error-handler";

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
    response.setHeader("Content-Type", "text/csv");
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=orders.csv"
    );
    response.status(200).send(ordersInCSV);
  } catch (err) {
    const error = handeError(err);
    response.status(error.status).send(error.message);
  }
};

const getOrderByIdController = async (
  request: Request<IdParamDict>,
  response: Response
) => {
  try {
    const { orderId } = request.params;
    const parsedId = parsedOrderIdFilters(orderId);
    const currentOrderInCSV = await orderByIdService(parsedId);
    response.setHeader("Content-Type", "text/csv");
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=orders.csv"
    );
    response.status(200).send(currentOrderInCSV);
  } catch (err) {
    const error = handeError(err);
    response.status(error.status).send(error.message);
  }
};

export { getOrderByWorthRangeController, getOrderByIdController };
