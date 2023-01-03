"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
    {
        id: "01",
        name: "camisa",
        price: 70,
        category: "roupas"
    }, {
        id: "02",
        name: "relógio",
        price: 500,
        category: "acessórios"
    }
];
exports.purchases = [
    {
        userId: "Joao",
        productId: "01",
        quantity: 3,
        totalPrice: 210
    }, {
        userId: "Brixner",
        productId: "02",
        quantity: 2,
        totalPrice: 1000
    }
];
//# sourceMappingURL=database.js.map