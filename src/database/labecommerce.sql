-- Active: 1673882407578@@127.0.0.1@3306

DROP TABLE users;

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

DROP TABLE products;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

DROP TABLE purchases;

CREATE Table purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases_products;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TEXT DEFAULT( DATETIME()) NOT NULL
);

INSERT INTO
    users (id, name, email, password)
VALUES (
        'u01',
        'Lucas',
        'lucas@email.com',
        'Lucas1988!'
    ), (
        'u02',
        'André',
        'andre@email.com',
        'Andre1988!'
    ), (
        'u03',
        'Juliana',
        'juliana@email.com',
        'Juliana1988!'
    );

SELECT * FROM users;

INSERT INTO
    products (id, name, price, description, imageUrl)
VALUES (
        'p001',
        'Camiseta Nike',
        120,
        'Camiseta básica nike',
        'url'
    ), (
        'p002',
        'Camiseta Adidas',
        110,
        'Camiseta básica adidas',
        'url'
    ), (
        'p003',
        'Ipad',
        5500,
        'Ipad Pro 9ª geração',
        'url'
    ), (
        'p004',
        'Apple Watch',
        5000,
        'Apple Watch 6ª geração',
        'url'
    ), (
        'p005',
        'Tênis Nike',
        800,
        'Tênis Nike Air Max',
        'url'
    );

SELECT * FROM products;

INSERT INTO purchases (id, total_price, buyer_id)
VALUES
    ('pu001', 50.99, 'u01'),
    ('pu002', 41.30, 'u01'),
    ('pu003', 12.50, 'u03'),
    ('pu004', 10.99, 'u03');

SELECT * FROM purchases;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('pu001', 'p003', 3),
    ('pu002', 'p004', 2),
    ('pu003', 'p005', 1);

SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

