import express, { type Express } from "express";
import { closeDb, connectDb } from "./config/db";
import { router } from "./routes";
import { applySwagger } from "./config/swagger";
import { createApp } from "./app";

const main = async () => {
  const PORT = 3000;
  const app = createApp();
  await connectDb();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down db connection");
    await closeDb();
    server.close(() => process.exit(0));
  });
};

main().catch((err) => {
  console.error("Starting server failed: ", err);
  process.exit(1);
});
