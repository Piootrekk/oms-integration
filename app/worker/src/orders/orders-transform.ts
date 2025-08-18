import type {
  IdosellResponseResult,
  OrderBaseCurrency,
  OrderCurrency,
  OrderProduct,
} from "./orders-external.types";
import type { Product, OrdersData } from "./orders.types";

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

export { transformOrderResults };
