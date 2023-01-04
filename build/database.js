"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.purchases = exports.products = exports.getAllUsers = exports.createUser = exports.users = exports.CATEGORY = void 0;
var CATEGORY;
(function (CATEGORY) {
    CATEGORY["SHOES"] = "Cal\u00E7ados";
    CATEGORY["ELETRONICS"] = "Eletr\u00F4nicos";
    CATEGORY["JEWELRY"] = "J\u00F3ias";
})(CATEGORY = exports.CATEGORY || (exports.CATEGORY = {}));
exports.users = [{
        id: "01",
        email: "lucas@labenu.com",
        password: "lucas1"
    },
    {
        id: "02",
        email: "andre@labenu.com",
        password: "andre2"
    },
    {
        id: "03",
        email: "juliana@labenu.com",
        password: "juliana3"
    }];
const createUser = (id, email, password) => {
    const user = {
        id,
        email,
        password
    };
    if (user) {
        exports.users.push(user);
        return "User created successfully";
    }
    else {
        return "User not created";
    }
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
exports.products = [{
        id: "p01",
        name: "Tênis Nike",
        price: 1250.00,
        category: CATEGORY.SHOES
    },
    {
        id: "p02",
        name: "Ipad",
        price: 2500.00,
        category: CATEGORY.ELETRONICS
    },
    {
        id: "p03",
        name: "Colar de Diamante",
        price: 5450.00,
        category: CATEGORY.JEWELRY
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
const createProduct = (id, name, price, category) => {
    const product = {
        id,
        name,
        price,
        category
    };
    if (product) {
        exports.products.push(product);
        return "Product created successfully";
    }
    else {
        return "Product not created";
    }
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    const productFound = exports.products.filter((product) => {
        return product.id === idToSearch;
    });
    return productFound;
};
exports.getProductById = getProductById;
const queryProductByName = (query) => {
    const productFound = exports.products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
    return productFound;
};
exports.queryProductByName = queryProductByName;
const createPurchase = (userId, productId, quantity) => {
    const userFound = exports.users.filter((user) => {
        return user.id === userId;
    });
    const productFound = exports.products.filter((product) => {
        return product.id === productId;
    });
    if (userFound.length > 0 && productFound.length > 0) {
        const purchase = {
            userId,
            productId,
            quantity,
        };
        const newPurchase = Object.assign(Object.assign({}, purchase), { totalPrice: quantity * productFound[0].price });
        exports.purchases.push(newPurchase);
        return "Purchase successfully";
    }
    else {
        return "Purchase went wrong";
    }
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    const purchasesFound = exports.purchases.filter((purchase) => {
        return purchase.userId === userIdToSearch;
    });
    return purchasesFound;
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map