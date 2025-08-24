import { Router, Request, Response } from "express";
import { orderRoutes } from "./order/order.routes";
import { authMiddleware } from "src/auth/auth.middleware";

const router = Router();

router.use("/api/v1/", authMiddleware, orderRoutes);

router.get("/", (_: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <h2>Express Server</h2>
        <p><a href="/docs">Go to Swagger Documentation</a></p>
        <p><em>Use API_KEY from .env file to use it in auth routes via ?key prarm or authorization header.</em></p>
      </body>
    </html>
  `);
});

export { router };
