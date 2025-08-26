import { OrderData } from "@oms/infra";
import { SearchOrdersResponse } from "../idosell-gateway";
import type { OrderDto } from "./compare.types";

const getOrdersDtoWithNewStatuses = (
  ordersGateway: SearchOrdersResponse["Results"],
  ordersDb: OrderData[]
): OrderDto[] => {
  const updatedOrders = ordersGateway
    .map((orderGateway) => {
      const matchingDbOrder = ordersDb.find((orderDb) =>
        matchOrdersIds(orderGateway, orderDb)
      );
      if (matchingDbOrder && !isSameStatus(orderGateway, matchingDbOrder)) {
        return transformToOrderDto(orderGateway, matchingDbOrder);
      }
    })
    .filter((order) => order !== undefined);
  return updatedOrders;
};

const transformToOrderDto = (
  orderGateway: SearchOrdersResponse["Results"][number],
  orderDb: OrderData
): OrderDto => {
  return {
    orderId: orderDb.orderId,
    status: orderGateway.orderDetails.orderStatus,
    oldStatus: orderDb.status,
  } satisfies OrderDto;
};

const matchOrdersIds = (
  orderGateway: SearchOrdersResponse["Results"][number],
  orderDb: OrderData
) => {
  return orderGateway.orderId === orderDb.orderId;
};

const isSameStatus = (
  orderGateway: SearchOrdersResponse["Results"][number],
  orderDb: OrderData
): boolean => {
  return orderGateway.orderDetails.orderStatus === orderDb.status;
};

export { getOrdersDtoWithNewStatuses };
