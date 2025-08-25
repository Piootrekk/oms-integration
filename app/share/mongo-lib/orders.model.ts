import { ObjectId } from "mongodb";

type OrderData = {
  orderId: string;
  price: number;
  currency: string;
  products: Product[];
  status: string;
};
type Product = {
  productId: number;
  quantity: number;
};

type OrderDataModel = {
  _id?: ObjectId;
} & OrderData;

export type { OrderData, Product, OrderDataModel };
