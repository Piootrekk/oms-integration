import { insertAllOrders } from "./orders";

const mainExec = async () => {
  await insertAllOrders();

  // const ids = await getAllOrders();
  // const sortedIds = ids.sort((a, b) => a - b);
  // console.log(sortedIds);
  // console.log(JSON.stringify({ ids }));
  // console.log(JSON.stringify(res));
  // runCronjob();
};

mainExec().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
