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
