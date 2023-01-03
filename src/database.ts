import { TUser, TProduct, TPurchase } from "./types";

export const users: TUser[] = [
  {
    id: "Joao",
    email: "joao@gmail.com",
    password: "joao123",
  },
  {
    id: "Brixner",
    email: "brixner@gmail.com",
    password: "brixner123",
  },
];

export const products: TProduct[] = [
  {
    id: "01",
    name: "camisa",
    price: 70,
    category: "roupas",
  },
  {
    id: "02",
    name: "relógio",
    price: 500,
    category: "acessórios",
  },
];

export const purchases: TPurchase[] = [
  {
    userId: "Joao",
    productId: "01",
    quantity: 3,
    totalPrice: 210,
  },
  {
    userId: "Brixner",
    productId: "02",
    quantity: 2,
    totalPrice: 1000,
  },
];
