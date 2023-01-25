import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser, TPurchase } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g;

//Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products");

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get Product by Name
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const result = await db("products").where("name", "LIKE", `%${q}%`);

    if (q.length < 1) {
      res.status(400);
      throw new Error("'query params' deve conter pelo menos um caractere");
    }

    if (result.length < 1) {
      res.status(404);
      throw new Error("produto não encontrado");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Create User
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body as TUser;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (id[0] !== "u") {
        res.status(400);
        throw new Error("'id' deve iniciar com a letra 'u'");
      }

      const [userExists] = await db("users").where({ id: id });

      if (userExists) {
        res.status(400);
        throw new Error("'id' do usuário já existente");
      }
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'nome' deve ser uma string");
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'email' deve ser uma string");
      }

      if (!email.match(regexEmail)) {
        res.status(400);
        throw new Error(
          "'email' deve possuir letras minúsculas, deve ter um @, letras minúsculas, um . e de 2 a 4 letras minúsculas"
        );
      }

      const [emailExists] = await db("users").where({ email: email });

      if (emailExists) {
        res.status(400);
        throw new Error("'email' do usuário já existente");
      }
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser uma string");
    }

    if (!password.match(regexPassword)) {
      res.status(400);
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
    };

    await db("users").insert(newUser);

    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Create Product
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body as TProduct;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (id[0] !== "p") {
        res.status(400);
        throw new Error("'id' deve iniciar com a letra 'p'");
      }

      const [productExists] = await db("products").where({ id: id });

      if (productExists) {
        res.status(400);
        throw new Error("'id' do produto já existente");
      }
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser uma string");
    }

    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser um number");
    }

    if (price <= 0) {
      res.status(400);
      throw new Error("'price' deve ser um número positivo");
    }

    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser uma string");
    }

    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'image' deve ser uma string");
    }

    const newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get All Purchases
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db("purchases");

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Create Purchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, total_price, buyer_id } = req.body as TPurchase;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      const [purchaseExists] = await db("purchases").where({ id: id });

      if (purchaseExists) {
        res.status(400);
        throw new Error("'id' da compra já existente");
      }
    }

    if (buyer_id !== undefined) {
      if (typeof buyer_id !== "string") {
        res.status(400);
        throw new Error("'buyer' deve ser uma string");
      }

      const [buyerExists] = await db("users").where({ id: buyer_id });

      if (!buyerExists) {
        res.status(400);
        throw new Error("'id' de usuário não existente");
      }

      if (typeof buyer_id !== "string") {
        res.status(400);
        throw new Error("'buyer' deve ser uma string");
      }
    }

    if (typeof total_price !== "number") {
      res.status(400);
      throw new Error("'totalPrice' deve ser um number");
    }

    if (total_price <= 0) {
      res.status(400);
      throw new Error("'totalPrice' deve ser um número positivo");
    }

    const newPurchase = {
      id: id,
      buyer_id: buyer_id,
      total_price: total_price,
    };

    await db("purchases").insert(newPurchase);

    res.status(201).send("Compra realizada com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get Products By Id
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToSearch = req.params.id;

    if (typeof idToSearch !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }

    if (idToSearch[0] !== "p") {
      res.status(400);
      throw new Error("'id' deve iniciar com a letra 'p'");
    }

    const [productExists] = await db("products").where({ id: idToSearch });

    if (!productExists) {
      res.status(400);
      throw new Error("'id' do produto não existe");
    }

    const result = await db("products").where({ id: idToSearch });

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get User Purchases By ID
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (id[0] !== "u") {
        res.status(400);
        throw new Error("'id' deve iniciar com a letra 'u'");
      }

      const userExist = await db("purchases").where({ buyer_id: id });

      if (!userExist) {
        res.status(400);
        throw new Error("'id' de usuário não existente");
      }
    }

    res.status(200).send("array de comprar do user no arquivo .db");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Delete User By Id
app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete !== undefined) {
      if (typeof idToDelete !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (idToDelete[0] !== "u") {
        res.status(400);
        throw new Error("'userId' deve iniciar com a letra 'u'");
      }

      const [ result ] = await db("users").where({ id: idToDelete });

      if (!result) {
        res.status(400);
        throw new Error("'id' não existente na base de dados");
      }

      await db("users").del().where({ id: idToDelete });

      res.status(200).send("user deletado com sucesso");
    }
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//DeleteProductById
app.delete("/product/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (typeof idToDelete !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }

    if (idToDelete[0] !== "p") {
      res.status(400);
      throw new Error("'userId' deve iniciar com a letra 'p'");
    }

    const result = await db("products").where({ id: idToDelete });

    if (!result) {
      res.status(404);
      throw new Error("'id' não existente na base de dados");
    }

    await db("products").del().where({ id: idToDelete });

    res.status(200).send("produto deletado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Edit User By Id
app.put("/user/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    if (idToEdit[0] !== "u") {
      res.status(400);
      throw new Error("'id' deve iniciar com a letra 'u'");
    }

    const [userExists] = await db("users").where({ id: idToEdit });

    if (!userExists) {
      res.status(400);
      throw new Error("'id' não existente na base de dados");
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser uma string");
      }
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (newId[0] !== "u") {
        res.status(400);
        throw new Error("'id' deve iniciar com a letra 'u'");
      }

      const [userIdExists] = await db("users").where({ id: newId });

      if (userIdExists) {
        res.status(400);
        throw new Error("'id' já existente base de dados");
      }
    }

    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'email' deve ser uma string");
      }

      if (!newEmail.match(regexEmail)) {
        res.status(400);
        throw new Error("'email' deve possuir as seguintes regras");
      }

      const [emailExists] = await db("users").where({ email: newEmail });

      if (emailExists) {
        res.status(400);
        throw new Error("'email' já existente na base de dados");
      }
    }

    if (!newPassword.match(regexPassword)) {
      res.status(400);
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }

    const [user] = await db("users").where({ id: idToEdit });

    if (user) {
      const updatedUser = {
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };

      await db("users").update(updatedUser).where({ id: idToEdit });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send("usuário atualizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 201) {
      res.status(500);
    }

    res.send(error.message);
  }
});

//Edit Product By Id
app.put("/product/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newdescription = req.body.description;
    const newImage = req.body.paid;

    if (typeof idToEdit !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }

    if (idToEdit[0] !== "p") {
      res.status(400);
      throw new Error("'id' deve iniciar com a letra 'p'");
    }

    const [productExists] = await db("products").where({ id: idToEdit });

    if (!productExists) {
      res.status(400);
      throw new Error("'id' não existente na base de dados");
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (newId[0] !== "p") {
        res.status(400);
        throw new Error("'id' deve iniciar com a letra 'p'");
      }

      const [productIdExists] = await db("products").where({ id: newId });

      if (productIdExists) {
        res.status(400);
        throw new Error("'id' já existente base de dados");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser uma string");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price' deve ser um number");
      }
    }

    if (newdescription !== undefined) {
      if (typeof newdescription !== "string") {
        res.status(400);
        throw new Error("'description' deve ser uma stringr");
      }
    }

    if (newImage !== undefined) {
      if (typeof newImage !== "string") {
        res.status(400);
        throw new Error("'image' deve ser uma string");
      }
    }

    const [product] = await db("products").where({ id: idToEdit });

    if (product) {
      const updatedProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: newPrice || product.price,
        description: newdescription || product.description,
        imageUrl: newImage || product.imageUrl,
      };

      await db("products").update(updatedProduct).where({ id: idToEdit });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send("produto atualizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error.message);
  }
});

// Get Purchase By Id
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [purchase] = await db("purchases").where({ id: id });

    if (purchase) {
      const [cart] = await db("purchases")
        .select(
          "purchases.id AS purchasesId",
          "purchases.total_price AS totalPrice",
          "purchases.created_at AS createdAt",
          "purchases.paid AS isPaid",
          "users.id AS buyerId",
          "users.email",
          "users.name"
        )
        .innerJoin("users", "purchases.buyer_id", "=", "users.id");

      const purchaseProducts = await db("purchases_products")
        .select(
          "purchases_products.product_id AS id",
          "products.name",
          "products.price",
          "products.description",
          "products.imageUrl AS urlImage",
          "purchases_products.quantity"
        )
        .innerJoin(
          "products",
          "products.id",
          "=",
          "purchases_products.product_id"
        );

      const result = {
        ...cart,
        isPaid: cart.isPaid === 0 ? false : true,
        productsList: purchaseProducts,
      };

      res.status(200).send(result);
    } else {
      res.status(404);
      throw new Error("Compra não encontrada");
    }
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
