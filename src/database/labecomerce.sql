-- Active: 1673882407578@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

PRAGMA table_info ('users');

DROP * FROM users;

SELECT * FROM users;

INSERT INTO
    users (id, email, password)
VALUES (
        'a01',
        'lucas@labenu.com',
        'Lucas1988!'
    ), (
        'a02',
        'andre@labenu.com',
        'Andre1987!'
    ), (
        'a03',
        'juliana@labenu.com',
        'Juliana1989!'
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

PRAGMA table_info ('products');

DROP TABLE products;

SELECT * FROM products;

INSERT INTO
    products (id, name, price, category)
VALUES (
        'p01',
        'Tênis',
        1250,
        'Calçados'
    ), (
        'p02',
        'Ipad',
        2500,
        'Eletrônicos'
    ), (
        'p03',
        'Colar de Diamante',
        5450,
        'Jóias'
    ), (
        'p04',
        'Apple Watch',
        5000,
        'Eletrônicos'
    ), (
        'p05',
        'Sandália',
        450,
        'Calçados'
    );