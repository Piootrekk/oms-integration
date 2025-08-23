import { getGatewayInstance } from "../gatewayInstance";
import { fetchAllOrders, getSearchRequestByDate } from "../idosell-gateway";

// const selectedStatuses = ["missing", "false", "finished", "canceled"];

const logNewItemFound = (amount: number) => {
  console.log("[FETCH] New orders found");
};

const logNotingFound = () => {
  console.log("[FETCH] Nothing new");
};

const getNewOrders = async (dateFrom: Date, dateTo: Date) => {
  const gateway = getGatewayInstance();
  const newOrdersRequest = getSearchRequestByDate(gateway, dateFrom, dateTo);
  try {
    await fetchAllOrders(newOrdersRequest, async (chunk) => {
      logNewItemFound(chunk.Results.length);
    });
  } catch (err) {
    logNotingFound();
  }
};

// const statuses = await getDistinctStatusesInOrders(db);
// console.log(statuses);
// const count = await getSelectedOrdersByStatuses(db, selectedStatuses);
// console.log(count);

export { getNewOrders };
