import express, { type Express } from "express";
import { router } from "./routes";
import { applySwagger } from "./config/swagger";

const createApp = (): Express => {
  const app: Express = express();
  app.use(express.json());
  app.use(router);
  applySwagger(app);
  return app;
};

export { createApp };
