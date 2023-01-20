"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
exports.products = [
    {
        id: "p001",
        name: "camisa",
        price: 70,
        category: types_1.CATEGORY.CLOTHES_AND_SHOES,
    },
    {
        id: "p002",
        name: "relógio",
        price: 500,
        category: types_1.CATEGORY.ACCESSORIES,
    },
];
exports.purchases = [
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
//# sourceMappingURL=database.js.map