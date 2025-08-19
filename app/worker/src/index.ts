import { getAllOrders } from "./orders";

const mainExec = async () => {
  const ids = (await getAllOrders()).sort();
  console.log(JSON.stringify({ ids }));
};

mainExec().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
