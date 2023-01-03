"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [{
        id: "1",
        email: "lucas@labenu.com",
        password: "lucas1"
    },
    {
        id: "2",
        email: "andre@labenu.com",
        password: "andre2"
    },
    {
        id: "3",
        email: "juliana@labenu.com",
        password: "juliana3"
    }];
exports.products = [{
        id: "p1",
        name: "Chuteira Nike",
        price: 750.00,
        category: "Esportes"
    },
    {
        id: "p2",
        name: "Chuteira Adidas",
        price: 690.00,
        category: "Esportes"
    },
    {
        id: "p3",
        name: "Chuteira Puma",
        price: 850.00,
        category: "Esportes"
    }];
exports.purchases = [{
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        quantity: 2,
        totalPrice: 2 * exports.products[0].price
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantity: 4,
        totalPrice: 4 * exports.products[1].price
    },
    {
        userId: exports.users[2].id,
        productId: exports.products[2].id,
        quantity: 3,
        totalPrice: 3 * exports.products[2].price
    }];
console.table(exports.users);
console.table(exports.products);
console.table(exports.purchases);
//# sourceMappingURL=database.js.map