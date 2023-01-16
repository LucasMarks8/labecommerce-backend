import {
  users,
  products,
  purchases,
  createUser,
  getAllUsers,
  createProduct,
  CATEGORY,
  getAllProducts,
  getProductById,
  queryProductByName,
  createPurchase,
  getAllPurchasesFromUserId,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors"
import { TProduct, TPurchase, TUser } from "./types";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001")
})

// console.log(users);
// console.log(products);
// console.log(purchases);


// console.log(createUser("05", "sidney@labenu.com", "sidney05"))
// console.log(getAllUsers());
// console.log(createProduct("04", "Computador", 1500.00, CATEGORY.ELETRONICS));
// console.log(getAllProducts());
// console.log(getProductById("p02"));
// console.log(queryProductByName("pad"));
// console.log(createPurchase("03", "p03", 3));
// console.log(getAllPurchasesFromUserId("03"));

//GetAllUsers
app.get('/users', (req: Request, res: Response) => {
  try {
    res.status(200).send(users)

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//GetAllProducts
app.get('/products', (req: Request, res: Response) => {
  try {
    res.status(200).send(products)

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//Search Product by Name
app.get('/products/search', (req: Request, res: Response) => {
  try {
    const q = req.query.q as string
    const result = products.filter((product) => {
      return product.name.toLowerCase().includes(q.toLowerCase())
    })

    if (q.length < 1) {
      res.status(400)
      throw new Error("'query params' deve conter pelo menos um caractere");
    }

    if (result.length < 1) {
      res.status(400)
      throw new Error("produto não encontrado");
    }

    res.status(200).send(result)

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//CreateUser
app.post('/users', (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body as TUser

    const newUser = {
      id,
      email,
      password
    }

    if (typeof newUser.id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string");
    }

    if (newUser.id[0] !== "a") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'a'");
    }

    //extra id existente
    const ids = users.find((user) => user.id === id)

    if (ids) {
      res.status(400)
      throw new Error("'id' já existente na base de dados")
    }

    if (typeof newUser.email !== "string") {
      res.status(400)
      throw new Error("'email' deve ser uma string")
    }

    //(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    if (!newUser.email.includes("@")) {
      res.status(400)
      throw new Error("'email' deve possuir as seguintes regras")
    }

    //extra email existente
    const emails = users.find((user) => user.email === email)

    if (emails) {
      res.status(400)
      throw new Error("'email' já existente na base de dados")
    }

    if (typeof newUser.password !== "string") {
      res.status(400)
      throw new Error("'password' deve ser uma string")
    }

    if (!newUser.password.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g))) {
      res.status(400)
      throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
    }

    users.push(newUser)

    res.status(201).send('Cadastro realizado com sucesso')

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

})

//CreateProduct
app.post('/products', (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body as TProduct

    const newProduct = {
      id,
      name,
      price,
      category
    }

    const ids = products.find((product) => product.id === id)

    if (ids) {
      res.status(400)
      throw new Error("'id' já existente na base de dados")
    }

    if (typeof newProduct.id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (newProduct.id[0] !== "p") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'p'")
    }

    if (typeof newProduct.name !== "string") {
      res.status(400)
      throw new Error("'name' deve ser uma string")
    }

    if (typeof newProduct.price !== "number") {
      res.status(400)
      throw new Error("'price' deve ser um number")
    }

    if (newProduct.price <= 0) {
      res.status(400)
      throw new Error("'price' deve ser um número positivo")
    }

    if (
      newProduct.category !== CATEGORY.ELETRONICS &&
      newProduct.category !== CATEGORY.JEWELRY &&
      newProduct.category !== CATEGORY.SHOES) {
      res.status(400)
      throw new Error("'category' deve ser do tipo? Calçados, Eletrônicos ou Jóias")
    }

    products.push(newProduct)

    res.status(201).send('Produto cadastrado com sucesso!')
  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//GetAllPurchases
app.get('/purchases', (req: Request, res: Response) => {
  try {
    res.status(200).send(purchases)

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//CreatePurchase
app.post('/purchases', (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase

    const newPurchase = {
      userId,
      productId,
      quantity,
      totalPrice
    }

    const userIds = users.find((user) => user.id === userId)

    if (!userIds) {
      res.status(404)
      throw new Error("'id' do usuário não existente na base de dados")
    }

    if (typeof newPurchase.userId !== "string") {
      res.status(400)
      throw new Error("'userId' deve ser uma string")
    }

    if (newPurchase.userId[0] !== "a") {
      res.status(400)
      throw new Error("'userId' deve iniciar com a letra 'a'")
    }

    const productIds = products.find((product) => product.id === productId)

    if (!productIds) {
      res.status(404)
      throw new Error("'id' do produto não existente na base de dados")
    }

    if (typeof newPurchase.productId !== "string") {
      res.status(400)
      throw new Error("'productId' deve ser uma string")
    }

    if (newPurchase.productId[0] !== "p") {
      res.status(400)
      throw new Error("'productId' deve iniciar com a letra 'p'")
    }

    const foundPrice = products.find((product) => {
      return product.price === productIds.price
    })

    if(!foundPrice) {
      res.status(400)
      throw new Error("Produto não encontrado");
    } 

    if(totalPrice !== quantity * productIds.price) {
      res.status(400)
      throw new Error("A quantidade ou o preço está incorreto");
    }

    if (typeof newPurchase.quantity !== "number") {
      res.status(400)
      throw new Error("'quantity' deve ser um number")
    }

    if (newPurchase.quantity <= 0) {
      res.status(400)
      throw new Error("'quantity' deve ser um número positivo")
    }

    if (typeof newPurchase.totalPrice !== "number") {
      res.status(400)
      throw new Error("'totalPrice' deve ser um number")
    }

    if (newPurchase.totalPrice <= 0) {
      res.status(400)
      throw new Error("'totalPrice' deve ser um número positivo")
    }

    purchases.push(newPurchase)

    res.status(201).send('Compra realizada com sucesso')

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }

})

//GetProductsById
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "p") {
      res.status(400)
      throw new Error("'userId' deve iniciar com a letra 'p'")
    }

    const result = products.find((product) => {
      return product.id === id
    })

    if (!result) {
      res.status(400)
      throw new Error("'id' não existente na base de dados")
    }

    res.status(200).send(result)

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }

})

//GetUserPurchasesByID
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "a") {
      res.status(400)
      throw new Error("'userId' deve iniciar com a letra 'a'")
    }

    const result = purchases.find((purchase) => {
      return purchase.userId === id
    })

    if (!result) {
      res.status(400)
      throw new Error("'id' não existente na base de dados")
    }

    res.status(200).send(result)

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//DeleteUserById
app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "a") {
      res.status(400)
      throw new Error("'userId' deve iniciar com a letra 'a'")
    }

    const result = users.find((user) => {
      return user.id === id
    })

    if (!result) {
      res.status(400)
      throw new Error("'id' não existente na base de dados")
    }

    const userIndex = users.findIndex((user) => {
      return user.id === id
    })

    if (userIndex >= 0) {
      users.splice(userIndex, 1)
      res.status(200).send("Usuário deletado com sucesso")
    }

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

})

//DeleteProductById
app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "p") {
      res.status(400)
      throw new Error("'userId' deve iniciar com a letra 'p'")
    }

    const productIds = products.find((product) => {
      return product.id === id
    })

    if (!productIds) {
      res.status(404)
      throw new Error("'id' não existente na base de dados")
    }

    const productIndex = products.findIndex((product) => {
      return product.id === id
    })

    if (productIndex >= 0) {
      products.splice(productIndex, 1)
      res.status(200).send("Produto deletado com sucesso")
    }
  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

})

//EditUserById 
app.put("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const newId = req.body.id
    const newEmail = req.body.email
    const newPassword = req.body.password

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "a") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'a'")
    }

    const user = users.find((user) => {
      return user.id === id
    })

    if (!user) {
      res.status(400)
      throw new Error("'id' não existente na base de dados")
    }

    if(newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
  
      if (newId[0] !== "a") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'a'")
      }

      const userId = users.find((user) => {
        return user.id === newId
      })
  
      if (userId) {
        res.status(400)
        throw new Error("'id' já existente base de dados")
      }
    }

    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400)
        throw new Error("'email' deve ser uma string")
      }

      if (!newEmail.match((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
        res.status(400)
        throw new Error("'email' deve possuir as seguintes regras")
      }

      //extra email existente
      const emails = users.find((user) => user.email === newEmail)

      if (emails) {
        res.status(400)
        throw new Error("'email' já existente na base de dados")
      }
    }

    if (!newPassword.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g))) {
      res.status(400)
      throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
    }

    if (user) {
      user.id = newId || user.id
      user.email = newEmail || user.email
      user.password = newPassword || user.password
    }

    res.status(200).send("usuário editado com sucesso")

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})

//EditProductById
app.put("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const newId = req.body.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "p") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'p'")
    }

    const product = products.find((product) => {
      return product.id === id
    })

    if (!product) {
      res.status(400)
      throw new Error("'id' não existente na base de dados")
    }

    if(newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
  
      if (newId[0] !== "p") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'p'")
      }

      const product = products.find((product) => {
        return product.id === newId
      })
  
      if (product) {
        res.status(400)
        throw new Error("'id' já existente base de dados")
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400)
        throw new Error("'name' deve ser uma string")
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400)
        throw new Error("'price' deve ser um number")
      }
    }

    if (newCategory !== undefined) {
      if (
        newCategory !== CATEGORY.ELETRONICS &&
        newCategory !== CATEGORY.JEWELRY &&
        newCategory !== CATEGORY.SHOES) {
        res.status(400)
        throw new Error("'category' deve ser do tipo? Calçados, Eletrônicos ou Jóias")
      }
    }

    if (product) {
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.category = newCategory || product.category
    }

    res.status(200).send("Produto atualizado com sucesso")

  } catch (error: any) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    res.send(error.message)
  }

})

