import { TUser, TProduct, TPurchase, PRODUCT_CATEGORY } from "./types";

export const users: TUser[] = [
  {
    id: "u001",
    email: "joao@gmail.com",
    password: "joao123",
  },
  {
    id: "u002",
    email: "brixner@gmail.com",
    password: "brixner123",
  },
];

export const products: TProduct[] = [
  {
    id: "p001",
    name: "camisa",
    price: 70,
    category: PRODUCT_CATEGORY.CLOTHES_AND_SHOES,
  },
  {
    id: "p002",
    name: "relógio",
    price: 500,
    category: PRODUCT_CATEGORY.ACCESSORIES,
  },
];

export const purchases: TPurchase[] = [
  {
    userId: "u001",
    productId: "p001",
    quantity: 3,
    totalPrice: 210,
  },
  {
    userId: "u002",
    productId: "p002",
    quantity: 2,
    totalPrice: 1000,
  },
];

export function createUser(
  id: string,
  email: string,
  password: string
): string {
  users.push({
    id,
    email,
    password,
  });
  return "Cadastro realizado com sucesso";
}

export function getAllUsers(): TUser[] {
  return users;
}

export function getProductById(id: string): undefined | TProduct {
  return products.find((product) => product.id === id);
}

export function createProduct(
  id: string,
  name: string,
  price: number,
  category: PRODUCT_CATEGORY
): string {
  products.push({
    id,
    name,
    price,
    category,
  });
  return "Produto criado com sucesso";
}

export function getAllProducts(): TProduct[] {
  return products;
}

export function queryProductsByName(q: string): TProduct[] {
  return products.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase())
  );
}

export function createPurchase(
  userId: string,
  productId: string,
  quantity: number,
  totalPrice: number
): string {
  purchases.push({
    userId,
    productId,
    quantity,
    totalPrice,
  });
  return "Compra realizada com sucesso";
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] {
  return purchases.filter((purchase) => purchase.userId === userIdToSearch);
}
