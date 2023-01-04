import { TProduct, TUser, TPurchase } from "./types"

export enum CATEGORY {
    SHOES = "Calçados",
    ELETRONICS = "Eletrônicos",
    JEWELRY = "Jóias"
}

export const users: TUser[] = [{
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
}]

export const products: TProduct[] = [{
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

export const createUser = (id: string, email: string, password: string): string => {
    const user: TUser = {
        id,
        email,
        password
    }
    if (user) {
        users.push(user)
        return "User created successfully"
    } else {
        return "User not created"
    }

}

export const getAllUsers = (): TUser[] => {
    return users
}

export const createProduct = (id: string, name: string, price: number, category: CATEGORY): string => {
    const product: TProduct = {
        id,
        name,
        price,
        category
    }

    if (product) {
        products.push(product)
        return "Product created successfully"
    } else {
        return "Product not created"
    }
}

export const getAllProducts = (): TProduct[] => {
    return products
}

export const getProductById = (idToSearch: string): TProduct[] | undefined => {
    const productFound = products.filter((product) => {
        return product.id === idToSearch
    })
    return productFound
}

export const queryProductByName = (query: string): TProduct[] | undefined => {
    const productFound = products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase())
    })
    return productFound
}

export const createPurchase = (userId: string, productId: string, quantity: number): string => {
    const userFound = users.filter((user) => {
        return user.id === userId
    })

    const productFound = products.filter((product) => {
        return product.id === productId
    })

    if (userFound.length > 0 && productFound.length > 0) {
        const purchase = {
            userId,
            productId,
            quantity,
        }
        const newPurchase = { ...purchase, totalPrice: quantity * productFound[0].price }
        purchases.push(newPurchase)
        return "Purchase successfully"
    } else {
        return "Purchase went wrong"
    }
}

export const getAllPurchasesFromUserId = (userIdToSearch: string): TPurchase[] => {
    const purchasesFound = purchases.filter((purchase) => {
        return purchase.userId === userIdToSearch
    })
    return purchasesFound
}
