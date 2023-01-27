-- Active: 1674786500299@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users VALUES
    ("u001", "johnny@gmail.com", "johny123"),
    ("u002", "fulano@hotmail.com", "asd123"),
    ("u003", "sebastian@outlook.com", "4324de");


SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


INSERT INTO products VALUES
    ("p001", "tenis", 500, "Acessories"),
    ("p002", "casaco", 200, "Acessories"),
    ("p003", "celular", 1500, "Electronics"),
    ("p004", "notebook", 4000, "Electronics"),
    ("p005", "mouse", 150, "Electronics");


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
-- resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versao 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- Get All Products versao 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price > 100 AND price < 500
ORDER BY price ASC;

-- Relacoes SQL

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases VALUES 
    ("c001", 500, 1, NULL, "u001"),
    ("c002", 200, 1, NULL, "u001"),
    ("c003", 100, 0, NULL, "u002"),
    ("c004", 1500, 1, NULL, "u002");

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

