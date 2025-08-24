import { Router, Request, Response } from "express";
import { orderRoutes } from "./order/order.routes";

const router = Router();

router.use("/api/v1/", orderRoutes);

router.get("/", (_: Request, res: Response) => {
  res.send("Express Server use /docs to swagger documentation");
});

export { router };
