import { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../../swagger.json";

const applySwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
};

export { applySwagger };
