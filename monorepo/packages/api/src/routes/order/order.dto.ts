import { OrderDataModel } from "@oms/infra";

type OrderDto = {
  orderId: string;
  price: number;
  pruducts: string;
};

const transformOrderDto = (order: OrderDataModel) => {
  const productsSerialized = order.products
    .map((p) => `(id:${p.productId} quanitity:${p.quantity})`)
    .join(",");
  const orderDto = {
    orderId: order.orderId,
    price: order.price,
    pruducts: productsSerialized,
  } satisfies OrderDto;
  return orderDto;
};

const transformOrdersDto = (orders: OrderDataModel[]): OrderDto[] => {
  const ordersDto = orders.map((order) => transformOrderDto(order));
  return ordersDto;
};

export { transformOrderDto, transformOrdersDto };
export type { OrderDto };
