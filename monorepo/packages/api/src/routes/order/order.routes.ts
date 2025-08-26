import { Router } from "express";
import {
  getOrderByIdController,
  getOrderByWorthRangeController,
} from "./order.controller";

const orderRoutes = Router();

orderRoutes.get("/orders", getOrderByWorthRangeController);
orderRoutes.get("/order/:orderId", getOrderByIdController);

export { orderRoutes };
