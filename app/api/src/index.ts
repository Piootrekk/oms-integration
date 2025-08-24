import express, { type Express } from "express";
import { closeDb, connectDb } from "./config/db";
import { router } from "./routes";

const main = async () => {
  const PORT = 3000;
  const app: Express = express();
  app.use(router);
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down db connection");
    await closeDb();
    process.exit(0);
  });
};

main().catch((err) => {
  console.error("Starting server failed: ", err);
  process.exit(1);
});
