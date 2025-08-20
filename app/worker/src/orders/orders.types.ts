type OrdersData = {
  orderId: string;
  price: number;
  products: Product[];
  status: string;
};
type Product = {
  productId: number;
  quantity: number;
};

export type { OrdersData, Product };

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
