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
import { TProduct, TUser } from "./types";
import { db } from "./database/knex";

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
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * 
     FROM users
    `);

    res.status(200).send(result)

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

//GetAllProducts
app.get('/products', async (req: Request, res: Response) => {
  try {

    const result = await db.raw(`SELECT * 
     FROM products
    `);

    res.status(200).send(result)

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

//Search Product by Name
app.get('/products/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string

    const result = await db.raw(`SELECT * 
     FROM products 
     WHERE name = "${q}";
    `);

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
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

//CreateUser
app.post('/users', async (req: Request, res: Response) => {
  try {

    const { id, name, email, password } = req.body as TUser

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string");
      }

      if (id[0] !== "a") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'a'");
      }

      const userExists = await db.raw(`SELECT *
        FROM users
        WHERE id = "${id}"
      `);

      if (userExists.length >= 1) {
        res.status(400)
        throw new Error("'id' do usuário já existente");
      }
    }

    if (typeof name !== "string") {
      res.status(400)
      throw new Error("'nome' deve ser uma string")
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400)
        throw new Error("'email' deve ser uma string")
      }

      //(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      if (!email.includes("@")) {
        res.status(400)
        throw new Error("'email' deve possuir as seguintes regras")
      }

      const emailExists = await db.raw(`SELECT *
        FROM users
        WHERE email = "${email}";
      `);

      if (emailExists.length >= 1) {
        res.status(400)
        throw new Error("'email' do usuário já existente");
      }
    }

    if (typeof password !== "string") {
      res.status(400)
      throw new Error("'password' deve ser uma string")
    }

    if (!password.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g))) {
      res.status(400)
      throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
    }

    await db.raw(`
      INSERT INTO users (id, name, email, password)
      VALUES ("${id}", "${name}", "${email}", "${password}");
    `)

    res.status(201).send('Cadastro realizado com sucesso')

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

//CreateProduct
app.post('/products', async (req: Request, res: Response) => {
  try {

    const { id, name, price, category } = req.body as TProduct

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }

      if (id[0] !== "p") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'p'")
      }

      const productExists = await db.raw(`SELECT *
        FROM products
        WHERE id = "${id}"
      `);

      if (productExists.length >= 1) {
        res.status(400)
        throw new Error("'id' do produto já existente");
      }
    }

    if (typeof name !== "string") {
      res.status(400)
      throw new Error("'name' deve ser uma string")
    }

    if (typeof price !== "number") {
      res.status(400)
      throw new Error("'price' deve ser um number")
    }

    if (price <= 0) {
      res.status(400)
      throw new Error("'price' deve ser um número positivo")
    }

    if (typeof category !== "string") {
      res.status(400)
      throw new Error("'category' deve ser uma string")
    }

    await db.raw(`
    INSERT INTO products (id, name, price, category)
    VALUES ("${id}", "${name}", "${price}", "${category}")
  `);

    res.status(201).send('Produto cadastrado com sucesso!')
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
}
)

//GetAllPurchases
app.get('/purchases', async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * 
      FROM purchases
   `)

    res.status(200).send(result)

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

//CreatePurchase
app.post('/purchases', async (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const total_price = req.body.totalPrice
    const paid = req.body.paid
    const delivery_at = req.body.createdAt
    const buyer_id = req.body.buyer

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }

      const purchaseExists = await db.raw(`SELECT *
        FROM purchases
        WHERE id = "${id}"
      `);

      if (purchaseExists.length >= 1) {
        res.status(400)
        throw new Error("'id' da compra já existente");
      }
    }

    if (buyer_id !== undefined) {
      if (typeof buyer_id !== "string") {
        res.status(400)
        throw new Error("'buyer' deve ser uma string")
      }

      const buyerExists = await db.raw(`SELECT *
        FROM users
        WHERE id = "${id}"
      `);

      if (buyerExists.length < 1) {
        res.status(400)
        throw new Error("'id' de usuário não existente");
      }
    }

    if (typeof total_price !== "number") {
      res.status(400)
      throw new Error("'totalPrice' deve ser um number")
    }

    if (total_price <= 0) {
      res.status(400)
      throw new Error("'totalPrice' deve ser um número positivo")
    }

    if (typeof paid !== "number") {
      res.status(400)
      throw new Error("'paid' deve ser um number")
    }

    if (paid > 1) {
      res.status(400)
      throw new Error("'paid' deve ser um número entre 0 e 1")
    }

    await db.raw(`
    INSERT INTO purchases (id, buyer_id, total_price, delivery_at, paid)
    VALUES ("${id}", "${buyer_id}", "${total_price}", "${delivery_at}", "${paid}")
  `)

    res.status(201).send('Compra realizada com sucesso')

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

//GetProductsById
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }

      if (id[0] !== "p") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'p'")
      }

      const productExists = await db.raw(`SELECT *
        FROM products
        WHERE id = "${id}";`)

      if (productExists.length < 1) {
        res.status(400)
        throw new Error("'id' do produto não existente");
      }
    }

    await db.raw(`SELECT * 
    FROM products
    WHERE id = "${id}"`)

    res.status(200).send("objeto encontrado do arquivo .db")

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }

})

//GetUserPurchasesByID
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }

      if (id[0] !== "u") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'u'")
      }

      const userExist = await db.raw(`SELECT *
      FROM purchases
      WHERE buyer_id = "${id}"
    `);

      if (userExist.length < 1) {
        res.status(400)
        throw new Error("'id' de usuário não existente");
      }
    }

    res.status(200).send("array de comprar do user no arquivo .db")

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
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

    if (newId !== undefined) {
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

    if (newId !== undefined) {
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

