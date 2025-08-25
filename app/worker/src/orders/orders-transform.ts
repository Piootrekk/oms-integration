import type {
  IdosellResponseResult,
  OrderBaseCurrency,
  OrderCurrency,
  OrderProduct,
} from "./orders-external.types";
import type { Product, OrderData } from "@shared/mongo-lib/orders.model";

const sumAllOrdersPayment = (payments: OrderBaseCurrency | OrderCurrency) => {
  const total =
    payments.orderDeliveryCost +
    payments.orderInsuranceCost +
    payments.orderProductsCost;
  return Math.round(total * 100) / 100;
};

const getProductsFromOrder = (products: OrderProduct[]): Product[] => {
  return products.map((productResult) => {
    return {
      productId: productResult.productId,
      quantity: productResult.productQuantity,
    } satisfies Product;
  });
};

const transformOrderResults = (result: IdosellResponseResult): OrderData => {
  return {
    orderId: result.orderId,
    price: sumAllOrdersPayment(result.orderDetails.payments.orderBaseCurrency),
    currency: result.orderDetails.payments.orderBaseCurrency.billingCurrency,
    status: result.orderDetails.orderStatus,
    products: getProductsFromOrder(result.orderDetails.productsResults),
  } satisfies OrderData;
};

const transformBulkOrdersResults = (results: IdosellResponseResult[]) => {
  const transformedResults = results.map((res) => transformOrderResults(res));
  return transformedResults;
};

export { transformOrderResults, transformBulkOrdersResults };
