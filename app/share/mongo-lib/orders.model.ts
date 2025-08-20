import { ObjectId } from "mongodb";

type OrderData = {
  orderId: string;
  orderSerialNumber: number;
  price: number;
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

export { OrderData, Product, OrderDataModel };
