import { SearchOrdersResponse } from "idosell/dist/responses";

type IdosellResponseResult = SearchOrdersResponse["Results"][number];
type OrderBaseCurrency =
  SearchOrdersResponse["Results"][number]["orderDetails"]["payments"]["orderBaseCurrency"];
type OrderCurrency =
  SearchOrdersResponse["Results"][number]["orderDetails"]["payments"]["orderCurrency"];
type OrderProduct =
  SearchOrdersResponse["Results"][number]["orderDetails"]["productsResults"][number];

export type {
  IdosellResponseResult,
  OrderBaseCurrency,
  OrderCurrency,
  OrderProduct,
};
