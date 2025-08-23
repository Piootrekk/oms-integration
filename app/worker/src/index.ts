import { runCronjob } from "./cronjob";
import { insertAllOrders } from "./orders/all";
import { getNewOrders } from "./orders/date-range";

const mainExec = async () => {
  await insertAllOrders();

  // const ids = await getAllOrders();
  // const sortedIds = ids.sort((a, b) => a - b);
  // console.log(sortedIds);
  // console.log(JSON.stringify({ ids }));
  // console.log(JSON.stringify(res));
  await runCronjob(async (currentDate, dateBefore) => {
    await getNewOrders(dateBefore, currentDate);
  });
};

mainExec().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
