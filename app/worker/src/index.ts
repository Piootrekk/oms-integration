import { runCronjob } from "./cronjob";
import { insertAllOrders } from "./orders/all";
import { getNewOrders } from "./orders/new";
import { getOrdersForUpdate } from "./orders/selected-states";

const mainExec = async () => {
  await insertAllOrders();
  await runCronjob(async (currentDate, dateBefore) => {
    await getNewOrders(dateBefore, currentDate);
    await getOrdersForUpdate();
  });
};

mainExec().catch((err: Error) => {
  console.error(err.message);
  process.exit(1);
});
