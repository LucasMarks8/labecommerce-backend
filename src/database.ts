import { TProduct, TUser, TPurchase } from "./types"

export const users: TUser[] = [{
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
}]

export const products: TProduct[] = [{
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
}]

export const purchases: TPurchase[] = [{
    userId: users[0].id,
    productId: products[0].id,
    quantity: 2,
    totalPrice: 2 * products[0].price
},
{
    userId: users[1].id,
    productId: products[1].id,
    quantity: 4,
    totalPrice: 4 * products[1].price
},
{
    userId: users[2].id,
    productId: products[2].id,
    quantity: 3,
    totalPrice: 3 * products[2].price
}]

console.table(users);
console.table(products);
console.table(purchases);
