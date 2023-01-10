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

//Teste
app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!')
})

//GetAllUsers
app.get('/users', (req: Request, res: Response) => {
  res.status(200).send(users)
})

//GetAllProducts
app.get('/products', (req: Request, res: Response) => {
  res.status(200).send(products)
})

//Search Product by Name
app.get('/products/search', (req: Request, res: Response) => {
  const q = req.query.q as string

  const result = products.filter((product) => {
    return product.name.toLowerCase().includes(q.toLowerCase())
  })
  res.status(200).send(result)
})

//CreateUser
app.post('/users', (req: Request, res: Response) => {
  const {id, email, password} = req.body as TUser

  const newUser = {
    id, 
    email,
    password
  }

  users.push(newUser)

  res.status(201).send('Cadastro realizado com sucesso')
})

//CreateProduct
app.post('/products', (req: Request, res: Response) => {
  const {id, name, price, category} = req.body as TProduct

  const newProduct = {
    id,
    name,
    price,
    category
  }

  products.push(newProduct)

  res.status(201).send('Produto cadastrado com sucesso!')
})

//GetAllPruchases
app.get('/purchases', (req: Request, res: Response) => {
  res.status(200).send(purchases)
})

//CreatePurchase
app.post('/purchases', (req: Request, res: Response) => {
  const {userId, productId, quantity, totalPrice} = req.body as TPurchase

  const newPurchase = {
    userId,
    productId,
    quantity,
    totalPrice
  }

  purchases.push(newPurchase)

  res.status(201).send('Compra realizada com sucesso')
})

//GetProductsById
app.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id as string

  const result = products.find((product) => {
    return product.id === id
  })

  res.status(200).send(result)
})

//GetUserPurchasesByID
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const id = req.params.id as string

  const result = purchases.filter((purchase) => {
    return purchase.userId === id
  })

  res.status(200).send(result)
})

//DeleteUserById
app.delete("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id as string

  const userIndex = users.findIndex((user) => {
    return user.id === id
  })

  if(userIndex >= 0) {
    users.splice(userIndex, 1)
    res.status(200).send("Usuário deletado com sucesso")
  } else {
    res.status(404).send("Usuário não encontrado")
  }
})

//DeleteProductById
app.delete("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id as string

  const productIndex = products.findIndex((product) => {
    return product.id === id
  })

  if(productIndex >=0) {
    products.splice(productIndex, 1)
    res.status(200).send("Produto deletado com sucesso")
  } else {
    res.status(404).send("Produto não encontrado")
  }
})

//EditUserById 
app.put("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id as string

  const newId = req.body.id as string
  const newEmail = req.body.email as string
  const newPassword = req.body.password as string

  const user = users.find((user) => {
    return user.id === id
  })

  if(user) {
    user.id = newId || user.id
    user.email = newEmail || user.email
    user.password = newPassword || user.password

    res.status(200).send("Cadastro atualizado com sucesso")
  } else {
    res.status(404).send("Id não encontrado")
  }
})

//EditProductById
app.put("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id as string

  const newId = req.body.id as string
  const newName = req.body.name as string
  const newPrice = req.body.price as number
  const newcategory = req.body.category as CATEGORY

  const product = products.find((product) => {
    return product.id === id
  })

  if(product) {
    product.id = newId || product.id
    product.name = newName || product.name
    product.price = newPrice || product.price
    product.category = newcategory || product.category
    
    res.status(200).send("Produto atualizado com sucesso")
  } else {
    res.status(404).send("Id não encontrado")
  }
})

 