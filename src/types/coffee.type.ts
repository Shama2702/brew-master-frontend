export interface ICoffee {
  _id: string;
  name: string;
  description?: string;
  image: null | string;
  price: number;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
