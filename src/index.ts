import {
  purchases,
  products,
  users,
  queryProductsByName,
  createProduct,
  createPurchase,
  createUser,
} from "./database";
import express, { Request, Response } from "express";
import { PRODUCT_CATEGORY } from "./types";
import cors from "cors";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", async(req: Request, res: Response) => {
    try {
        const result = await db.raw(
            "SELECT * FROM users;"
        )
        res.status(200).send(result);
    } catch (error : any) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }  
});

app.get("/users/:id/purchases", async(req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        
        const result = await db.raw(
            `SELECT * FROM purchases
            WHERE buyerId = ${userId};
            `
        )

        if (result.length < 1){
            res.status(404);
            throw new Error ("Compra não encontrada");
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;

        const user = users.find(user => user.id === id);

        if (!user) {
            res.status(404);
            throw new Error ("Usuário não encontrado");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("Email deve ser uma string");
            }
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Senha deve ser uma string");
            }
        }

        user.email = email || user.email;
        user.password = password || user.password;

        res.status(200).send("Cadastro atualizado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
    
});

app.delete("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex >= 0){
            users.splice(userIndex, 1);
        } else {
            res.status(404);
            throw new Error ("Usuário não encontrado");
        }
        res.status(200).send("User apagado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }  
});

app.get("/products", async(req: Request, res: Response) => {
    try {
        const result = await db.raw(
            "SELECT * FROM products;"
        )
        res.status(200).send(result);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
});

app.get("/products/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const [result] = await db.raw(
            `SELECT * FROM products
            WHERE id = "${id}"`
        );

        if (!result){
            res.status(404);
            throw new Error ("Produto não encontrado");
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    } 
});

app.get("/purchases", async(req: Request, res: Response) => {
   try {
        const result = await db.raw(
            "SELECT * FROM purchases;"
        )
        res.status(200).send(result);    
    } catch (error : any) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    } 
});

app.get("/product/search", async(req: Request, res: Response) => {
    try {
        const q = req.query.q as string;

        if (q !== undefined){
            if (q.length < 1){
                res.status(400);
                throw new Error ("'q' deve possuir ao menos um caracter");
            }
        } else {
            res.status(400);
            throw new Error ("'q' precisa ser definido");
        }
         const product = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE('%${q}%');
        `)

        res.status(200).send(product);
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;

        const product = products.find(product => product.id === id);

        if (!product){
            res.status(404);
            throw new Error ("Produto não encontrado");
        }

        if (name !== undefined){
            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("Nome do produto deve ser uma string");
            }
        }

        if (price !== undefined){
            if (typeof price !== "number"){
                res.status(400);
                throw new Error ("Preço do produto deve ser um número");
            }
        }

        if (category !== undefined){
            if (
                category !== "Acessórios" &&
                category !== "Roupas" &&
                category !== "Eletrônicos"
            ){
                res.status(400);
                throw new Error ("Categoria deve ser uma das existentes");
            }
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;

        res.status(200).send("Produto atualizado com sucesso!");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex >= 0){
            users.splice(productIndex, 1);
        } else {
            res.status(404);
            throw new Error ("Produto não encontrado");
        }
        res.status(200).send("Produto apagado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    } 
});

app.post("/users", async(req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("Id do user deve ser uma string");
            }

            for (let i = 0; i < users.length; i++){
                if (users[i].id === id){
                    res.status(400);
                    throw new Error ("Já existe um user com esse id");
                }
            }
        } else {
            res.status(400);
            throw new Error ("User precisa ter um id");
        }

        if (name !== undefined){
            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("Nome do user deve ser uma string");
            }
            } else {
            res.status(400);
            throw new Error ("User precisa ter um nome");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("Email do user deve ser uma string");
            }

            for (let i = 0; i < users.length; i++){
                if (users[i].email === email){
                    res.status(400);
                    throw new Error ("Já existe um user com esse email");
                }
            }
        } else {
            res.status(400);
            throw new Error ("User precisa ter um email");
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Password do user deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("User precisa ter um password");
        }

        await db.raw(`
            INSERT INTO users(id, name, email, password) VALUES
            ("${id}", "${name}", "${email}", "${password}");
        `)
        
        
        res.status(201).send("Cadastro realizado com sucesso"); 

    } catch (error) {

        console.log(error);

        if (res.statusCode === 200){
            res.status(500);
        }

        res.send(error.message);
    }
});

app.post("/products", async(req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        const category = req.body.category as PRODUCT_CATEGORY

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("Id deve ser uma string");
            }

            for (let i = 0; i < products.length; i++){
                if (products[i].id === id){
                    res.status(400)
                    throw new Error ("Já existe um produto com esse id");
                }
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter um id");
        }

        if (name !== undefined){
            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("Nome do produto deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter um nome"); 
        }

        if (price !== undefined){
            if (typeof price !== "number"){
                res.status(400);
                throw new Error ("Preço do produto deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter um preço"); 
        }

        if (description !== undefined){
            if (typeof description !== "string"){
                res.status(400);
                throw new Error ("Descrição do produto deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter uma descrição"); 
        }

        if (imageUrl !== undefined){
            if (typeof imageUrl !== "string"){
                res.status(400);
                throw new Error ("URL da imagem deve ser uma string");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter uma URL de imagem"); 
        }

        if (category != undefined){
            if (
                category !== "Acessórios" &&
                category !== "Roupas e calçados" &&
                category !== "Eletrônicos"
            ){
                res.status(400);
                throw new Error ("Produto deve ter uma categoria existente");
            }
        } else {
            res.status(400);
            throw new Error ("Produto deve ter uma categoria");
        }

        await db.raw(`
            INSERT INTO products(id, name, price, description, imageUrl, category) VALUES 
            ("${id}", "${name}", "${price}", "${description}", "${imageUrl}", "${category}")
        `);

        res.status(201).send("Produto cadastrado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

app.post("/purchases", async(req: Request, res: Response) => {
        try {
        const id = req.body.id;
	    const buyerId = req.body.buyerId;
	    const totalPrice = req.body.totalPrice;
        const paid = req.body.paid;

        if (id !== undefined){
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("id deve ser uma string");
            }

        } else {
            res.status(400);
            throw new Error ("Compra deve ter um id");
        }

        if (buyerId !== undefined){
            if (typeof buyerId !== "string"){
                res.status(400);
                throw new Error ("buyerId deve ser uma string");
            }
   
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um id de usuário");
        }

        if (totalPrice !== undefined){
            if (typeof totalPrice !== "number"){
                res.status(400);
                throw new Error ("Preço total da compra deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um preço total");
        }

        if (paid !== undefined){
            if (typeof paid !== "number"){
                res.status(400);
                throw new Error ("Status de pago deve ser um número");
            }
        } else {
            res.status(400);
            throw new Error ("Compra deve ter um status de pago");
        }
	
        await db.raw(
            `INSERT INTO purchases(id, buyerId, totalPrice, paid) VALUES
            ("${id}", "${buyerId}", "${totalPrice}", "${paid}")`
        )
	
	    res.status(201).send("Compra realizada com sucesso");


    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
      const purchaseId = req.params.id;
  
      const [purchases] = await db("purchases").where({ id: purchaseId})
  
      if (!purchases) {
        res.status(400);
        throw new Error("Compra não encontrado");
      }
  
      await db("purchases_products").del().where({ purchase_id: purchaseId })
      await db("purchases").del().where({ id:purchaseId})
  
      res.status(200).send("Produto apagado com sucesso");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });

app.listen(3003, () => {
  console.log("Servidor rodando!");
});
