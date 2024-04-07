export interface IOrder {
  _id: string;
  coffees: {
    coffee: {
      _id: string;
      name: string;
      image: null | string;
      price: number;
    };
    quantity: number;
    _id: string;
  }[];
  total_price: number;
  status:
    | "pending"
    | "processing"
    | "ready"
    | "on-the-way"
    | "delivered"
    | "cancelled";
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IAdminOrder extends IOrder {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}
