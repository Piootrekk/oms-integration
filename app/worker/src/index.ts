import { getAllOrders } from "./orders";
const mainExec = async () => {
  // const ids = (await getAllOrders()).sort();
  const res = await getAllOrders();
  // console.log(JSON.stringify({ ids }));
  console.log(JSON.stringify(res));
};

mainExec().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
