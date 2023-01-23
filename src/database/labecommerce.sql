-- Active: 1673882407578@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

PRAGMA table_info ('users'); 

DROP TABLE users;

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

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

PRAGMA table_info ('products');

DROP TABLE products;

INSERT INTO
    products (id, name, price, category)
VALUES (
        'p001',
        'Camiseta Nike',
        120,
        'Roupas'
    ), (
        'p002',
        'Camiseta Adidas',
        110,
        'Roupas'
    ), (
        'p003',
        'Ipad',
        5500,
        'Eletrônicos'
    ), (
        'p004',
        'Apple Watch',
        5000,
        'Eletrônicos'
    ), (
        'p005',
        'Tênis Nike',
        800,
        'Calçados'
    );

SELECT * FROM products;

SELECT * FROM products WHERE name = 'Ipad';

INSERT into
    users (id, name, email, password)
VALUES (
        'u04',
        'Bob',
        'bobynho@email.com',
        'Bobynho2019!'
    );

SELECT * FROM users;

INSERT into
    products (id, name, price, category)
VALUES (
        'p006',
        'TV Smart 70 polegadas',
        7500,
        'Eletrõnicos'
    );

SELECT * FROM products;

SELECT * FROM products WHERE id = 'p003';

DELETE FROM users WHERE id = 'u04';

SELECT * FROM users;

INSERT into
    users (id, name, email, password)
VALUES (
        'u04',
        'Bob',
        'bobynho@email.com',
        'Bobynho2019!'
    );

SELECT * FROM users;


DELETE FROM products WHERE id = 'p006';

SELECT * FROM products;

INSERT into
    products (id, name, price, category)
VALUES (
        'p006',
        'TV Smart 70 polegadas',
        7500,
        'Eletrõnicos'
    );

SELECT * FROM products;

UPDATE users
SET
    email = 'lucaseditado@labenu.com',
    password = 'Lucaseditado1988!'
WHERE id = 'u01';

UPDATE products
SET
    name = 'Camiseta Nike Editado',
    price = 250,
    category = 'Roupas'
WHERE id = 'p01';

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT *
FROM products
WHERE
    price >= 500
    AND price <= 5500
ORDER BY price ASC;

DROP TABLE purchases;

CREATE Table purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivery_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ('pu001', 50.99, 0, 'u01'),
    ('pu002', 41.30, 0, 'u01'),
    ('pu003', 12.50, 0, 'u03'),
    ('pu004', 10.99, 0, 'u03');

SELECT * FROM purchases;

UPDATE purchases
SET
    delivery_at = DATETIME('now')
WHERE id = 'pu001';

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = 'u01';

DROP TABLE purchases_products;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TEXT DEFAULT( DATETIME()) NOT NULL
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('pu001', 'p03', 3),
    ('pu002', 'p04', 2),
    ('pu003', 'p05', 1);

SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

