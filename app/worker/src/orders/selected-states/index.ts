import { getDBConnectionString } from "./../../env";
import { getGatewayInstance } from "../gateway-instance";
import {
  fetchAllOrders,
  getSerchRequestSelectedStatuses,
  SearchOrdersResponse,
} from "../idosell-gateway";
import {
  getOrdersByIds,
  updateOrdersWithNewState,
} from "@shared/mongo-lib/orders.query";
import { dbSession } from "@shared/mongo-lib/connection";
import { getOrdersDtoWithNewStatuses } from "./compare";
import { handleErrorToMessage } from "./../../utils/error-handler";
import { OrderDto } from "./compare.types";

const SELECTED_STATUSES = ["missing", "false", "finished", "canceled"];
const ALL_STATES = [
  "canceled",
  "false",
  "finished",
  "missing",
  "delivery_waiting",
  "new",
  "on_order",
  "packed",
  "packed_ready",
  "payment_waiting",
  "ready",
  "suspended",
  "wait_for_dispatch",
];

const STATES_FOR_UPDATE = ALL_STATES.filter(
  (state) => !SELECTED_STATUSES.includes(state),
);

const isNothingUpdated = (newOrders: OrderDto[]) => {
  if (newOrders.length === 0) {
    return true;
  }
  return false;
};

const logUpdateState = (
  orderid: string,
  oldStatus: string,
  newStatus: string,
) => {
  console.log(
    `[Update] Order nr: ${orderid} changes status: ${oldStatus} -> ${newStatus}`,
  );
};

const logError = (err: unknown) => {
  console.error(`[Update] ERROR IN UPDATE ORDERS ${handleErrorToMessage(err)}`);
};

const manageOrdersForUpdate = async (
  chunkOrders: SearchOrdersResponse,
  dbString: string,
) => {
  const idsOrdersFromGateway = chunkOrders.Results.map((res) => res.orderId);
  await dbSession(dbString, async (db) => {
    const ordersFromDb = await getOrdersByIds(db, idsOrdersFromGateway);
    const newStatusesOrders = getOrdersDtoWithNewStatuses(
      chunkOrders.Results,
      ordersFromDb,
    );
    if (isNothingUpdated(newStatusesOrders)) return;
    await updateOrdersWithNewState(db, newStatusesOrders);
    newStatusesOrders.forEach(({ orderId, status, oldStatus }) =>
      logUpdateState(orderId, oldStatus, status),
    );
  });
};

const getOrdersForUpdate = async () => {
  const gateway = getGatewayInstance();
  const dbString = getDBConnectionString();
  const ordersRequestWithStatuses = getSerchRequestSelectedStatuses(
    gateway,
    STATES_FOR_UPDATE,
  );
  try {
    await fetchAllOrders(ordersRequestWithStatuses, async (chunk) => {
      await manageOrdersForUpdate(chunk, dbString);
    });
  } catch (err) {
    logError(err);
  }
};

export { getOrdersForUpdate };
