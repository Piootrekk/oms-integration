import idosell from "idosell";
import { getIdoSellApiKey, getIdosellUrl } from "./env";
import type { SearchOrdersResponse } from "idosell/dist/responses";

// Status list:
// "new" - not handled,
// "finished" - completed,
// "false" - false,
// "lost" - lost,
// "on_order" - in progress,
// "packed" - being picked,
// "ready" - ready,
// "canceled" - canceled by customer,
// "payment_waiting" - awaiting payment,
// "delivery_waiting" - awaiting delivery,
// "suspended" - on hold,
// "joined" - merged,
// "finished_ext" - handled in FA application.

type OrdersData = {
  orderId: string;
  price: number;
  products: Product[];
  status?: string;
};
type Product = {
  productId: number;
  quantity: number;
};

type IdosellResponseResult = SearchOrdersResponse["Results"][number];
type OrderBaseCurrency =
  SearchOrdersResponse["Results"][number]["orderDetails"]["payments"]["orderBaseCurrency"];
type OrderCurrency =
  SearchOrdersResponse["Results"][number]["orderDetails"]["payments"]["orderCurrency"];
type OrderProduct =
  SearchOrdersResponse["Results"][number]["orderDetails"]["productsResults"][number];

const sumAllOrdersPayment = (payments: OrderBaseCurrency | OrderCurrency) => {
  return (
    payments.orderDeliveryCost +
    payments.orderInsuranceCost +
    payments.orderProductsCost
  );
};

const getProductsFromOrder = (products: OrderProduct[]): Product[] => {
  return products.map((productResult) => {
    return {
      productId: productResult.productId,
      quantity: productResult.productQuantity,
    } satisfies Product;
  });
};

const transformOrderResults = (result: IdosellResponseResult): OrdersData => {
  return {
    orderId: result.orderId,
    price: sumAllOrdersPayment(result.orderDetails.payments.orderBaseCurrency),
    status: result.orderDetails.orderStatus,
    products: getProductsFromOrder(result.orderDetails.productsResults),
  } satisfies OrdersData;
};

const mainExec = async () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();

  const idosellInstance = idosell(idosellUrl, idosellApiKey);
  const orders = await idosellInstance.getOrders
    .ordersSerialNumbers(Array.from(Array(1000).fill(0), (_, index) => index))
    .exec();
  const selectedResults = orders.Results.map((order) => {
    return transformOrderResults(order);
  });
  console.log(JSON.stringify(selectedResults));
};

mainExec().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
