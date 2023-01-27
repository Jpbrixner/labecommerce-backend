-- Active: 1674786500299@@127.0.0.1@3306
CREATE TABLE users (
     id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

INSERT INTO users(id, name, email, password)VALUES
    ("u001","Johnny", "johnny@gmail.com", "johny123"),
    ("u002","Fulano", "fulano@hotmail.com", "asd123"),
    ("u003","Sebastian","sebastian@outlook.com", "4324de");


SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    category TEXT NOT NULL
);


INSERT INTO products VALUES
    ("p001", "tenis", 500, "Ótimo para corrida.","https://imgnike-a.akamaihd.net/1920x1920/022104ID.jpg", "Acessories"),
    ("p002", "casaco", 200, "Mantenha-se aquecido com estilo.","https://images-americanas.b2w.io/produtos/1329692233/imagens/blusa-de-frio-swag-casaco-moletom-jaqueta-diverse-estilos/1329692233_1_xlarge.jpg","Acessories"),
    ("p003", "celular", 1500,"Melhor câmera do mercado","https://imgs.casasbahia.com.br/55033578/1xg.jpg?imwidth=500", "Electronics"),
    ("p004", "notebook", 4000, "Perfeito para jogos.","https://m.media-amazon.com/images/I/81VNCWPxsVL._AC_SX450_.jpg", "Electronics"),
    ("p005", "mouse", 150,"Leve e ergonômico","https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/m/o/mouse-gamer-g403-rgb-lightsync-12000dpi-logitech_266596.jpg", "Electronics");


SELECT * FROM products;


-- Aprofundamento SQL


-- Get All Users
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

-- Search Product by Name
SELECT * FROM products
WHERE name LIKE "Celular";

-- Create User
INSERT INTO users VALUES ("u004", "ciclano@gmail.com", "78945");

-- Create Product
INSERT INTO products VALUES ("p006", "monitor", 1200, "Electronics");

-- Get Products by id
SELECT * FROM products
WHERE id = "p002";

-- Delete User by id
DELETE FROM users
WHERE id = "u003";

-- Delete Product by id
DELETE FROM products
WHERE id = "p006";

-- Edit User by id
UPDATE users
SET email = "jose@gmail.com",
    password = "45612"
WHERE id = "u004";

-- Edit Product by id
UPDATE products
SET name = "teclado",
    price = 220
WHERE id = "p005";

-- Get All Users

SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versao 1

SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- Get All Products versao 2

SELECT * FROM products
WHERE price > 100 AND price < 500
ORDER BY price ASC;

-- Relacoes SQL

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyerId TEXT NOT NULL,
    totalPrice REAL UNIQUE NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyerId) REFERENCES users(id)
);

INSERT INTO purchases(id, buyerId, totalPrice, paid) VALUES 
    ("c001", "u003", 500, 1),
    ("c002", "u001", 4000, 1),
    ("c003", "u002", 1500, 0),
    ("c004", "u001", 150, 1);

UPDATE purchases
SET delivered_at = datetime('now')
WHERE id = "c002";

SELECT * FROM purchases;

SELECT 
    users.id AS userId,
    users.email,
    purchases.total_price
FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id;

-- Relacoes SQL II

DROP TABLE purchases_products;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products(purchase_id, product_id, quantity) VALUES
    ("c001", "p001", "2"),
    ("c001", "p002", "2"),
    ("c002", "p001", "3");

SELECT * FROM purchases_products;

SELECT 
purchases.id AS purchaseId,
products.name AS productName,
purchases.buyer_id AS buyerId
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

SELECT 
purchases.id AS purchaseId,
products.name AS productName,
purchases.buyer_id AS buyerId
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
RIGHT JOIN products
ON purchases_products.product_id = products.id;

